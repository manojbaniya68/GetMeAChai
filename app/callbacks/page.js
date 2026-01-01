"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();
  useEffect(() => {
    async function verifyPayment() {
      const params = new URLSearchParams(window.location.search);

      const encodedData = params.get("data");
      if (!encodedData) {
        router.push("/");
        return;
      }

      // Decode Base64 JSON
      const payload = JSON.parse(atob(encodedData));

      console.log("Decoded Payload:", payload);

      const data = {
        transaction_uuid: payload.transaction_uuid,
        transaction_code: payload.transaction_code,
        total_amount: payload.total_amount,
        status: payload.status,
        product_code: payload.product_code,
        signature: payload.signature,
        signed_field_names: payload.signed_field_names,
      };

      console.log("Final Data:", data);

      const res = await fetch("/api/esewa/verify_payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log("Verification Result:", result);

      // You can redirect or show UI based on result
      // if (result.verified) router.push("/thank-you")
      if(result.ok)
      {
        router.push("/esewa/success");
      }
      else
      {
        router.push("/esewa/failure");
      }
    }

    verifyPayment();
  }, []);
}
