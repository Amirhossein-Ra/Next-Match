import { Card, CardBody, CardHeader } from "@nextui-org/react";
import React from "react";

export default function EmptyState() {
  return (
    <div className="flex justify-center items-center mt-20">
      <Card className="p-5">
        <CardHeader className="text-3xl ">
          There are no results for this filters
        </CardHeader>
        <CardBody className="text-center">
          please select a diffrent filter
        </CardBody>
      </Card>
    </div>
  );
}
