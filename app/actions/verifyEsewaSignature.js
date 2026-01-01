"use server";

import crypto from "crypto";

export async function verifyEsewaSignature(data, secretKey) {
  const fields = data.signed_field_names.split(",");

  let message = "";
  for (const field of fields) {
    message += `${field}=${data[field]},`;  
  }
    message = message.slice(0, -1); // Remove trailing comma

  const expectedSignature = crypto
    .createHmac("sha256", secretKey)
    .update(message)
    .digest("base64");

  return expectedSignature === data.signature;
}
