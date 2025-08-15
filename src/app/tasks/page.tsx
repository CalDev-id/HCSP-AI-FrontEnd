import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableFive from "@/components/Tables/TableFive";
import TableOne from "@/components/Tables/TableOne";
import Link from "next/link";

const CabangPage = () => {
  return (
<DefaultLayout>
  {/* <TableFive /> */}
  <section>
    <h2>Browse Tasks</h2>
    <p>Discover and create premade tasks that combine multiple instructions and specific knowledge</p>

    <label className="input">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
  <input type="search" required placeholder="Search" />
</label>
  </section>
</DefaultLayout>

  );
};

export default CabangPage;
