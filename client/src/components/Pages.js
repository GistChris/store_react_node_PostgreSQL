import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";
import { Pagination } from "react-bootstrap";

const Pages = observer(() => {
  const { device } = useContext(Context);
  const pages = [];
  const pageCount = Math.ceil(device.totalCount /device.limit);
  console.log("pageCount=",pageCount)
  for (let index = 0; index < pageCount; index++) {
    pages.push(index + 1);
  }
  return (
    <Pagination className="mt-5">
     
      {pages.map((page) => (
        <Pagination.Item
          key={page}
          active={device.page === page}
          onClick={() => device.setPage(page)}
        >
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  );
});

export default Pages;
