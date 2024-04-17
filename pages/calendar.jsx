import React, { useState, useEffect } from "react";
import { Badge, Calendar as AntCalendar } from "antd"; // Renamed imported Calendar to AntCalendar
import { supabase } from "../config/supabaseClient";
import Sidebar from "../components/Sidebar";

const CustomCalendar = () => {
  // Renamed Calendar to CustomCalendar
  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    const fetchAvailableDates = async () => {
      try {
        const { data, error } = await supabase.rpc("get_available_days", {});
        if (error) {
          console.error("Error fetching available dates:", error.message);
        } else {
          setAvailableDates(data); // Assuming data is an array of available dates
        }
      } catch (error) {
        console.error("Error fetching available dates:", error.message);
      }
    };

    fetchAvailableDates();
  }, []);

  const isDateAvailable = (value) => {
    const dateString = value.format("YYYY-MM-DD");
    return availableDates.includes(dateString);
  };

  const getListData = (value) => {
    const dateKey = value.format("YYYY-MM-DD");
    const isAvailable = isDateAvailable(value);
    return isAvailable ? ["Available"] : ["Not Available"];
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index}>
            <Badge
              status={item === "Available" ? "success" : "error"}
              text={item}
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <Sidebar>
        <AntCalendar cellRender={dateCellRender} />{" "}
        {/* Replaced Calendar with AntCalendar */}
      </Sidebar>
    </>
  );
};

export default CustomCalendar;
