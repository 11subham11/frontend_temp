import React, { useState } from "react";
import { Link } from "react-router-dom";

//Paginate
import ReactPaginate from "react-paginate";
import "./pagination.css";

const Tab = ({ data, rowsPerPage }) => {
  // for pagination
  const [admins, setAdmins] = useState(data.slice(0));
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 8;
  const pagesVisited = pageNumber * usersPerPage;
  const [pageCount, setPageCount] = useState(
    Math.ceil(data.length / usersPerPage)
  );

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const [searchterm, setSearchTerm] = useState("");

  return (
    <div className=" text-sm text-left pt-3">
      <h1 className="text-xl text-green-500 font-bold uppercase my-3 ml-10">
        Admin Information
      </h1>
      <div className="px-12 text-start sm:px-0">
        <div className="flex justify-center">
          <div className="mb-3 xl:w-96 md:w-96 sm:w-96">
            <label
              htmlFor="Text"
              className="form-label font-Poppins inline-block mb-2 text-gray-700 font-bold text-sm"
            >
              Search Admins
            </label>
            <input
              type="text"
              className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-sm
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
              id="Text"
              placeholder="Search Admins Here"
              value={searchterm}
              onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <table className="w-[94%] text-sm text-left mx-10">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 border border-gray-300 text-center">
          <tr>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Full Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              isDeleted
            </th>
            <th scope="col" className="px-6 py-3">
              isConfirmed
            </th>
            <th scope="col" className="px-6 py-3">
              isSuspended
            </th>
            <th scope="col" className="px-6 py-3">
              isBlocked
            </th>
            <th scope="col" className="px-6 py-3">
              MoreInfo
            </th>
          </tr>
        </thead>
        <tbody className=" text-gray-800 text-center">
          {admins.length > 0 ? (
            <>
              {data &&
                admins
                  .filter((val) => {
                    if (searchterm === "") {
                      return val;
                    } else if (
                      val.firstName
                        .toLowerCase()
                        .includes(searchterm.toLowerCase()) ||
                      val.email.toLowerCase().includes(searchterm.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .slice(pagesVisited, pagesVisited + usersPerPage)
                  .map((val) => (
                    <tr
                      key={val.id}
                      className="border border-gray-300 bg-gray-100 hover:bg-white text-gray-700"
                    >
                      <td className="px-6 py-4 font-medium">{val.id}</td>
                      <td className="px-6 py-4 font-medium">{val.firstName}</td>
                      <td className="px-6 py-4 font-medium">{val.email}</td>
                      <td className="px-6 py-4 font-medium">
                        {val.isDeleted == 1 ? "True" : "False"}
                      </td>
                      <td className="px-6 py-4 font-medium">
                        {val.isConfirmed == 1 ? "True" : "False"}
                      </td>
                      <td className="px-6 py-4 font-medium">
                        {val.isSuspended == 1 ? "True" : "False"}
                      </td>
                      <td className="px-6 py-4 font-medium">
                        {val.isBlocked == 1 ? "True" : "False"}
                      </td>
                      {/* user suspend button */}
                      <td className="px-6 py-4 font-medium">
                        <Link to={`/get-admin/${val.id}`} className=" w-10">
                          <i className="fa-solid fa-user"></i>
                        </Link>
                      </td>
                    </tr>
                  ))}
            </>
          ) : (
            <>
              {data &&
                data
                  .filter((val) => {
                    if (searchterm === "") {
                      return val;
                    } else if (
                      val.firstName
                        .toLowerCase()
                        .includes(searchterm.toLowerCase()) ||
                      val.email.toLowerCase().includes(searchterm.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .slice(pagesVisited, pagesVisited + usersPerPage)
                  .map((val) => (
                    <tr
                      key={val.id}
                      className="border border-gray-300 bg-gray-100 hover:bg-white text-gray-700"
                    >
                      <td className="px-6 py-4 font-medium">{val.id}</td>
                      <td className="px-6 py-4 font-medium">{val.firstName}</td>
                      <td className="px-6 py-4 font-medium">{val.email}</td>
                      <td className="px-6 py-4 font-medium">
                        {val.isDeleted == 1 ? "True" : "False"}
                      </td>
                      <td className="px-6 py-4 font-medium">
                        {val.isConfirmed == 1 ? "True" : "False"}
                      </td>
                      <td className="px-6 py-4 font-medium">
                        {val.isSuspended == 1 ? "True" : "False"}
                      </td>
                      <td className="px-6 py-4 font-medium">
                        {val.isBlocked == 1 ? "True" : "False"}
                      </td>
                      {/* user suspend button */}
                      <td className="px-6 py-4 font-medium">
                        <Link to={`/get-admin/${val.id}`} className=" w-10">
                          <i className="fa-solid fa-user"></i>
                        </Link>
                      </td>
                    </tr>
                  ))}
            </>
          )}
        </tbody>
      </table>

      {/* <TableFooter range={range} slice={slice} setPage={setPage} page={page} /> */}
      {searchterm === "" && admins.length > 0 ? (
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      ) : (
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={
            data.filter((val) => {
              if (
                val.firstName
                  .toLowerCase()
                  .includes(searchterm.toLowerCase()) ||
                val.email.toLowerCase().includes(searchterm.toLowerCase())
              ) {
                return val;
              }
            }).length / usersPerPage
          }
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      )}
    </div>
  );
};

export default Tab;
