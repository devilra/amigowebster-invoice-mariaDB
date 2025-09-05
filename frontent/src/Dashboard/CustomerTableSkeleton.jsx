import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Checkbox,
  Skeleton,
} from "@mui/material";

const CustomerTableSkeleton = ({ rows = 5 }) => {
  return (
    <TableBody>
      {[...Array(rows)].map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Checkbox disabled />
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <Skeleton variant="circular" width={32} height={32} />
              <Skeleton width={100} />
            </div>
          </TableCell>
          <TableCell>
            <Skeleton width={120} />
          </TableCell>
          <TableCell>
            <Skeleton width={50} />
          </TableCell>
          <TableCell>
            <Skeleton width={80} />
          </TableCell>
          <TableCell>
            <Skeleton width={80} />
          </TableCell>
          <TableCell>
            <Skeleton width={60} />
          </TableCell>
          <TableCell>
            <Skeleton width={60} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default CustomerTableSkeleton;
