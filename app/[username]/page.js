"use client";
import React from "react";
import { useState } from "react";
import { savePayment, getPaymentData } from "../actions/useractions";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const UserName = ({ params }) => {
  const [payments, setPayments] = useState([]);

  const { username } = React.use(params);
  console.log("username", username);

  const [PaymentData, setPaymentData] = useState({
    name: "",
    message: "",
    amount: "",
  });

  const router = useRouter()

  const verifyUser = async() => {
    const res = await fetch(`/api/user-exist?username=${username}`);
    const {userExist} = await res.json()
    if(!userExist){
      router.push("/")
    }
  }
   verifyUser();


  const handleChange = (e) => {
    setPaymentData({ ...PaymentData, [e.target.name]: e.target.value });
    console.log(PaymentData);
  };

  async function pay(amount) {
    //  console.log("payment datas: ",await getPaymentData(username));
    const res = await fetch("/api/esewa/payment", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ amount,username }),
    });

    const data = await res.json();
    console.log("checking data", data);
    const { setDetail, ...paymentDetails } = data;
    if (!setDetail) {
      alert(
        "Please set your eSewa Merchant Code and Secret Key in your profile settings before making a payment."
      );
      return;
    }
    await savePayment({
      name: PaymentData.name,
      to_user: username,
      oid: paymentDetails.transaction_uuid,
      message: PaymentData.message,
      amount: amount,
    });

    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    Object.keys(paymentDetails).forEach((key) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = paymentDetails[key];
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  }

  useEffect(() => {
    async function fetchPayments() {
      const res = await fetch("/api/getPaymentData", {
        method: "POST",
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
      setPayments(data);
    }

    fetchPayments();
  }, [username]);

  return (
    <>
      <div className="image relative">
        <img
          className="object-cover w-full h-[320]"
          src="/patreon_banner.gif"
          alt=""
        />
        <div className="profile absolute -bottom-10 left-1/2 transform -translate-x-1/2">
          <img
            className="rounded-full h-32 w-32 border-4 border-white mt-[-50px]"
            src="https://avatars.githubusercontent.com/u/62713756?v=4"
            alt=""
          />
        </div>
      </div>
      <div className="text-white flex flex-col items-center mt-12">
        <div className="text-slate-100 text-lg font-bold">@{username}</div>
        <div className="text-slate-600 text-[14px]">
          Creating Animated Arts for Chai Lovers
        </div>
        <div className="text-slate-600 text-[14px]">
          8234 members. 39 posts. $123/release
        </div>
      </div>
      <div className="payment w-[80%] container mx-auto mt-8 pb-10 flex justify-center gap-2">
        <div className="suppoters bg-slate-900 w-1/2 rounded-lg text-white p-10 ">
          <h2 className="text-lg font-bold mb-4">Recent Supporters</h2>
          <ul className="mx-5">
            {payments.map((element, index) => (
              <li key={index} className="flex itemas-center gap-2 mb-2 h-14">
                <div className="w-[28px] h-6 rounded-full border border-slate-300 p-1 flex justify-center items-center">
                  <img
                    height={30}
                    width={30}
                    src="/avatar.gif"
                    alt="user avatar"
                  />
                </div>
                <div>
                  {element.name} donated Rs.{element.amount} with the message
                  {element.message}.
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="makePayment bg-slate-900 w-1/2 rounded-lg text-white p-3  ">
          <h2 className="text-lg font-bold mb-4">Make a Payment</h2>
          <div className="flex flex-col gap-2 mt-4">
            {/* input for name and message */}
            <input
              onChange={handleChange}
              className="bg-slate-800 p-2 rounded-l-lg w-full"
              type="text"
              placeholder="Enter Name"
              name="name"
              value={PaymentData.name}
            />
            <input
              onChange={handleChange}
              className="bg-slate-800 p-2 rounded-l-lg w-full"
              type="text"
              placeholder="Enter Message"
              name="message"
              value={PaymentData.message}
            />
            <input
              onChange={handleChange}
              className="bg-slate-800 p-2 rounded-l-lg w-full"
              type="text"
              placeholder="Enter Amount"
              name="amount"
              value={PaymentData.amount}
            />
            <button
              onClick={() => pay(PaymentData.amount)}
              type="button"
              className="text-white bg-gradient-to-br from-purple-900 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Pay
            </button>
          </div>
          {/* or choose from this amounts */}
          <div className="mt-4">
            <button
              onClick={() => pay(5)}
              className="bg-slate-700 p-2 rounded-lg mr-2"
            >
              5
            </button>
            <button
              onClick={() => pay(10)}
              className="bg-slate-700 p-2 rounded-lg mr-2"
            >
              10
            </button>
            <button
              onClick={() => pay(20)}
              className="bg-slate-700 p-2 rounded-lg mr-2"
            >
              20
            </button>
            <button
              onClick={() => pay(50)}
              className="bg-slate-700 p-2 rounded-lg mr-2"
            >
              50
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserName;
