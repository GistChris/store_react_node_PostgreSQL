import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Context } from "../index";
import { Row } from "react-bootstrap";
import DeviceItem from "./DeviceItem";
import { fetchDevices } from "../http/deviceApi";
const DeviceList = observer(() => {
  const { device } = useContext(Context);
  useEffect(() => {
    fetchDevices(
      device.selectedType.id,
      device.selectedBrand.id,
      device.page,
      7,
      (device.name = "k")
    ).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, [device.page, device.selectedType, device.selectedBrand, device]);
  return (
    <Row className="d-flex">
      {device.devices
        // .slice()
        // .sort((a, b) => a.id - b.id)
        .map((device) => (
          <DeviceItem key={device.id} device={device}></DeviceItem>
        ))}
    </Row>
  );
});

export default DeviceList;
