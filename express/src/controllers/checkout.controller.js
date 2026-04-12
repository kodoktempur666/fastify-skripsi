import { createCheckout, getCheckout, editCheckout, patchCheckout } from "../models/checkout.model.js";

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data
    });
}

export const createCheckouts = async (req, res, next) => {
    const { name, amount, item } = req.body;
    try {
        const newCheckout = await createCheckout(name, amount, item);
        handleResponse(res, 201, 'Checkout created successfully', newCheckout);
    } catch (err) {
        next(err)
    }
}

export const getCheckouts = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await getCheckout(id);

    handleResponse(res, 200, "Checkout got successfully", data);
  } catch (err) {
    next(err);
  }
};


export const editCheckouts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, amount, item } = req.body;

    const updatedCheckout = await editCheckout(
      id,
      name,
      amount,
      item
    );

    handleResponse(res, 200, "Checkout edited successfully", updatedCheckout);
  } catch (error) {
    next(error);
  }
};

export const patchCheckouts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, amount, item } = req.body;

    const patchedCheckout = await patchCheckout(
      id,
      name ?? null,
      amount ?? null,
      item ?? null
    );

    handleResponse(res, 200, "Checkout patched successfully", patchedCheckout);
  } catch (error) {
    next(error);
  }
};