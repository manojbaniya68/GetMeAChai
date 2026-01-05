import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="h-[40vh] flex flex-col justify-center items-center gap-2 text-white p-4">
        <div className="flex justify-center items-center">
          <div className="h-20 flex justify-center items-center font-bold text-3xl">
            Buy me a Chai
          </div>
          <div className="h-20">
            <img
              className="h-15 flex justify-center items-center"
              src="/tea-unscreen.gif"
              alt="tea"
            />
          </div>
        </div>
        <p className="text-center m-2">
          A courdfunding platform to fund your projects with chai. Get funded by
          your fans and followers.
        </p>
        <div className="button">
          <Link
            href={"/about"}
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Read More
          </Link>
        </div>
      </div>
      <div className="container mx-auto text-white">
        <div className="bg-white h-1 opacity-10"></div>
        <h2 className="text-2xl font-bold text-center my-4">
          Your fans can buy you a Chai
        </h2>
        <div className="flex flex-col sm:flex-row justify-around gap-6 m-5 ">
          <div className="item flex flex-col justify-center items-center">
            <img
              className="bg-slate-500 h-20 w-20 rounded-full p-3"
              src="./man.png"
              alt="man"
            />
            <div className="flex flex-col items-center mt-2">
              <h2 className="font-bold">Fans want to help</h2>
              <p className="text-[15px]">
                Your fans are available to support you.
              </p>
            </div>
          </div>

          <div className="item flex flex-col justify-center items-center">
            <img
              className="bg-slate-500 h-20 w-20 rounded-full p-3"
              src="./coin.gif"
              alt="coin"
            />
            <div className="flex flex-col items-center mt-2">
              <h2 className="font-bold">Fans want to contribute</h2>
              <p className="text-[15px]">
                Your fans are willing to contribute financially
              </p>
            </div>
          </div>
          <div className="item flex flex-col justify-center items-center">
            <img
              className="bg-slate-500 h-20 w-20 rounded-full p-3"
              src="./group.gif"
              alt="group"
            />
            <div className="flex flex-col items-center mt-2">
              <h2 className="font-bold">Fans want to collaborate</h2>
              <p className="text-[15px]">Your fans are ready to collaborate.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
