import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableFive from "@/components/Tables/TableFive";
import TableOne from "@/components/Tables/TableOne";
import Link from "next/link";
import CardTasks from "@/components/CardTasks/CardTasks";

const CabangPage = () => {
  const tasks = [
    { opened: "Opened 5 times", taskTitle: "Profile Match Up Promosi" },
    { opened: "Opened 3 times", taskTitle: "Mutasi Antar Divisi" },
    { opened: "Opened 7 times", taskTitle: "Job Vacancy Internal" },
    { opened: "Opened 2 times", taskTitle: "Learning Recommendation" },
    { opened: "Opened 4 times", taskTitle: "Create DJM" }
  ];

  return (
    <DefaultLayout>
      {/* <TableFive /> */}
      <div className="flex w-full flex-col lg:flex-row h-screen">
        <section className="w-full pr-50">
          <h2 className="text-2xl font-bold text-black">Browse Tasks</h2>
          <p className="text-black">
            Discover and create premade tasks that combine multiple instructions
            and specific knowledge
          </p>

          <label className="input my-5 w-96 rounded-2xl">
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

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {tasks.map((task, index) => (
              <CardTasks
                key={index}
                opened={task.opened}
                taskTitle={task.taskTitle}
              />
            ))}
          </div>
        </section>
        <div className="flex items-center justify-center h-1/2">
          <div className="w-96">
            <p className="bg-greenSecondary text-greenPrimary w-fit rounded-2xl p-2 px-8 font-semibold">
              All Tasks
            </p>
            <p className="rounded-2xl p-2 px-8 ">Created by me</p>
            <p className="rounded-2xl p-2 px-8 pb-15">My recently used</p>
            <p className="w-fit rounded-full border border-slate-400 p-2 px-4 font-semibold">
              + Create Tasks
            </p>
            <div className="text-sm text-slate-600 mt-2">
              <p className="mt-2">Vacant position & fullfillment status</p>
              <p className="mt-2">Probation Status Overview</p>
              <p className="mt-2">Potential Reassessment</p>
              <p className="mt-2">Talent Tracker</p>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CabangPage;
