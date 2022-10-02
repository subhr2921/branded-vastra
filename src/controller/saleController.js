const db = require("../models");
const Ajv = require("ajv");
const { productValidator } = require("./validators");
const { commonResponse } = require("../helpers/commonResponse");
const { extractTokenInfo } = require("../helpers/extractTokenInfo");
const moment = require("moment");
const { QueryTypes } = require("sequelize");
const environment = process.env.ENVIRONMENT || "development";
const config = require(__dirname + "/../config/config.json")[environment];

const ajv = new Ajv();
const createSale = async (req, res) => {
  try {
    /** Customer Data Insert Start */
    let customerTblData = {
      name: req.body.full_name || null,
      address: req.body.address || null,
      mobile_no: req.body.mobile_number,
    };
    let customerInsert = await db.tbl_customer_masters.create(
      customerTblData,
      {
        raw: true,
      }
    );
    let customerId = customerInsert?.id;
    /** Customer Data Insert End */

    /** Order Data Insert Start */
    let orderTblData = {
      customer_id: customerInsert?.id,
      total_amount: req.body.total_amount,
      gst_amount: req.body.total_gst,
    };
    let orderInsert = await db.tbl_orders.create(orderTblData, {
      raw: true,
    });
    let orderId = orderInsert?.id;
    /** Order Data Insert End */

    /** Invoice No Update */
    let invoice_no = `${moment().format("YYYYMMDD")}-${
      customerInsert?.id
    }-${orderId}`;
    await db.tbl_orders.update(
      {
        invoice_no,
      },
      {
        where: {
          id: orderId,
        },
      }
    );

    /** Order Details Table Data Start */
    let productId = JSON.parse(req.body.productId);
    let productMRP = JSON.parse(req.body.productMRP);
    let productUniqueNo = JSON.parse(req.body.productUniqueNo);
    let quantity = JSON.parse(req.body.quantity);
    let discount = JSON.parse(req.body.discount);
    let gstAmount = JSON.parse(req.body.gstAmount);
    let amount = JSON.parse(req.body.amount);

    let orderDetailsTblData = [];
    for (let i = 0; i < productId.length; i++) {
      await db.sequelize.query(
        `UPDATE tbl_product_details SET quantity = quantity - :soldQuantity WHERE product_id = :product_id`,
        {
          replacements: { soldQuantity: quantity[i], product_id: productId[i] },
          plain: false,
          raw: true,
          type: QueryTypes.UPDATE,
        }
      );
    }
    productId.map((item, index) => {
      orderDetailsTblData.push({
        customer_id: customerInsert?.id,
        order_id: orderId,
        product_id:item,
        product_unique_no: productUniqueNo[index],
        quantity: quantity[index],
        mrp: productMRP[index],
        discount: discount[index],
        gst_amount: gstAmount[index],
        selling_price: amount[index],
      });
    });
    let orderDetailsInsert = await db.tbl_order_details.bulkCreate(
      orderDetailsTblData
    );

    /** Order Details Table Data End */
    if (orderDetailsInsert) return commonResponse(res, 200, invoice_no);
    return commonResponse(res, 500, []);
  } catch (err) {
    return commonResponse(res, 500, [], err.message, "", environment);
  }
};

const getSaleDataByInvoiceNo = async (req, res) => {
  try {
    let invoice_no = req.param.invoice_no || req.query.invoice_no || null;
    if (invoice_no === null) return commonResponse(res, 400, []);
    let data = await db.tbl_orders.findOne({
      attributes: [
        "id",
        "customer_id",
        "invoice_no",
        "total_amount",
        "gst_amount",
        "createdAt",
      ],
      include: [
        {
          model: db.tbl_customer_masters,
          as: "customers",
          attributes: ["id", "name", "address", "mobile_no", "createdAt"],
        },
        {
          model: db.tbl_order_details,
          as: "orderDetails",
          attributes: [
            "id",
            "customer_id",
            "order_id",
            "product_id",
            "product_unique_no",
            "mrp",
            "discount",
            "gst_amount",
            "selling_price",
            "quantity",
          ],
          include: [
            {
              model: db.tbl_products,
              as: "products",
              attributes: [
                "id",
                "brand_id",
                "product_name",
                "description",
                "mrp",
                "discount",
                "price",
              ],
            },
          ],
        },
      ],
      where: {
        invoice_no: invoice_no,
      },
    });
    return commonResponse(res, 200, data);
  } catch (err) {
    return commonResponse(res, 500, [], err.message, "", environment);
  }
};

const saleController = {
  createSale,
  getSaleDataByInvoiceNo,
};

module.exports = saleController;
