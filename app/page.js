import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="h-[40vh] flex flex-col justify-center items-center gap-2 text-white">
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
        <p>
          A courdfunding platform to fund your projects with chai. Get funded by
          your fans and followers.
        </p>
        <div className="button">
          <Link
            href={'/about'}
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
        <div className="flex justify-around gap-6 m-5 ">
          <div className="item flex flex-col justify-center items-center">
            <img
              className="bg-slate-500 h-20 w-20 rounded-full p-3"
              src="./man.png"
              alt="man"
            />
            <p className="font-bold">Fund Yourself</p>
          </div>
          <div className="item flex flex-col justify-center items-center">
            <img
              className="bg-slate-500 h-20 w-20 rounded-full p-3"
              src="./man.png"
              alt="man"
            />
            <p className="font-bold">Fund Yourself</p>
          </div>
          <div className="item flex flex-col justify-center items-center">
            <img
              className="bg-slate-500 h-20 w-20 rounded-full p-3"
              src="./man.png"
              alt="man"
            />
            <p className="font-bold">Fund Yourself</p>
          </div>
        </div>
      </div>
    </>
  );
}
