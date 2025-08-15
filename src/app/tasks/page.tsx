import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableFive from "@/components/Tables/TableFive";
import TableOne from "@/components/Tables/TableOne";
import Link from "next/link";

const CabangPage = () => {
  return (
    <DefaultLayout>
      {/* <TableFive /> */}
      <section>
        <h2 className="text-2xl font-bold text-black">Browse Tasks</h2>
        <p className="text-black">
          Discover and create premade tasks that combine multiple instructions
          and specific knowledge
        </p>

        <label className="input my-5 rounded-2xl w-96">
          <svg
            className="h-[1em] opacity-80"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" required placeholder="Search tasks" />
        </label>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* The modal */}
          <label
            htmlFor="my_modal_7"
            className="flex cursor-pointer flex-col items-start rounded-xl border border-slate-400 bg-[#dbfcf2] p-4 pb-20"
          >
            <p className="text-sm text-slate-600">Opened 5 times</p>
            <h1 className="font-semibold text-[#23a969]">
              Profile Match Up Promosi
            </h1>
          </label>

          {/* Put this part before </body> tag */}
          <input type="checkbox" id="my_modal_7" className="modal-toggle" />
          <div className="modal" role="dialog">
            <div className="modal-box rounded-xl border border-slate-400">
              <h3 className="text-lg font-bold">Profile Match Up Promosi</h3>
              <p className="py-4">This modal works with a hidden checkbox!</p>
              
              <p>Instruction</p>
              <textarea className="textarea" placeholder="Instruksi"></textarea>
              <p>Knowledge</p>
              <input type="file" className="file-input" />
              <div className="flex justify-end">
                <button className="btn rounded-full bg-black text-white">Run</button>
              </div>
            </div>
            <label className="modal-backdrop" htmlFor="my_modal_7">
              Close
            </label>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default CabangPage;
