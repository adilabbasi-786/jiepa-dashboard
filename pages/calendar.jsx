// import React, { useState } from 'react';
// import { format, addMonths, startOfMonth, endOfMonth, addDays, isWithinInterval } from 'date-fns';

// const Calendar = () => {
//   const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-20'));
//   const [endDate, setEndDate] = useState(format(addMonths(new Date(), 1), 'yyyy-MM-20'));
//   const [calendarDays, setCalendarDays] = useState(generateCalendarDays(startDate, endDate));

//   function generateCalendarDays(start, end) {
//     const days = [];
//     const currentDate = startOfMonth(start);
//     const lastDate = endOfMonth(end);

//     while (currentDate <= lastDate) {
//       days.push(new Date(currentDate));
//       currentDate.setDate(currentDate.getDate() + 1);
//     }

//     return days;
//   }

//   const handleStartDateChange = (e) => {
//     setStartDate(e.target.value);
//   };

//   const handleEndDateChange = (e) => {
//     setEndDate(e.target.value);
//   };

//   const handleEnterClick = () => {
//     setCalendarDays(generateCalendarDays(startDate, endDate));
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <div className="flex justify-between p-4">
//         <div>
//           <label htmlFor="startDate" className="mr-2">
//             Start Date:
//           </label>
//           <input
//             type="date"
//             id="startDate"
//             value={startDate}
//             onChange={handleStartDateChange}
//             className="border rounded p-1"
//           />
//         </div>
//         <div>
//           <label htmlFor="endDate" className="mr-2">
//             End Date:
//           </label>
//           <input
//             type="date"
//             id="endDate"
//             value={endDate}
//             onChange={handleEndDateChange}
//             className="border rounded p-1"
//           />
//         </div>
//         <button className="bg-blue-500 text-white p-2 rounded" onClick={handleEnterClick}>
//           Enter
//         </button>
//       </div>
//       <div className="p-4">
//         <div className="w-full m-auto p-4 border rounded-lg bg-white">
//           <table className="table-auto w-full">
//             <thead>
//               <tr>
//                 <th className="border p-2">Sun</th>
//                 <th className="border p-2">Mon</th>
//                 <th className="border p-2">Tue</th>
//                 <th className="border p-2">Wed</th>
//                 <th className="border p-2">Thu</th>
//                 <th className="border p-2">Fri</th>
//                 <th className="border p-2">Sat</th>
//               </tr>
//             </thead>
//             <tbody>
//               {[...Array(6)].map((_, rowIndex) => (
//                 <tr key={rowIndex}>
//                   {[...Array(7)].map((_, colIndex) => {
//                     const index = rowIndex * 7 + colIndex;
//                     const day = calendarDays[index];
//                     const isCurrentMonth = isWithinInterval(day, {
//                       start: startOfMonth(startDate),
//                       end: endOfMonth(endDate),
//                     });

//                     return (
//                       <td
//                         key={colIndex}
//                         className={`border p-2 ${
//                           isCurrentMonth ? 'text-black' : 'text-gray-300'
//                         }`}
//                       >
//                         {day ? format(day, 'd') : ''}
//                       </td>
//                     );
//                   })}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Calendar;

// import React from 'react';
// import { Badge, Calendar } from 'antd';
// const getListData = (value) => {
//   let listData;
//   switch (value.date()) {
//     case 8:
//       listData = [
//         {
//           type: 'success',
//           content: 'Internationals Woman Day',
//         },
//         {
//           type: 'warning',
//           content: 'Not take any new appointment',
//         },
//       ];
//       break;
//     case 18:
//       listData = [
//         {
//           type: 'warning',
//           content: 'Taking rest',
//         },
//         {
//           type: 'success',
//           content: 'Good luck',
//         },

//       ];
//       break;

//     default:
//   }
//   return listData || [];
// };
// const getMonthData = (value) => {
//   if (value.month() === 8) {
//     return 1394;
//   }
// };
// const App = () => {
//   const monthCellRender = (value) => {
//     const num = getMonthData(value);
//     return num ? (
//       <div className="notes-month">
//         <section>{num}</section>
//         <span>Backlog number</span>
//       </div>
//     ) : null;
//   };
//   const dateCellRender = (value) => {
//     const listData = getListData(value);
//     return (
//       <ul className="events">
//         {listData.map((item) => (
//           <li key={item.content}>
//             <Badge status={item.type} text={item.content} />
//           </li>
//         ))}
//       </ul>
//     );
//   };
//   const cellRender = (current, info) => {
//     if (info.type === 'date') return dateCellRender(current);
//     if (info.type === 'month') return monthCellRender(current);
//     return info.originNode;
//   };
//   return <Calendar cellRender={cellRender} />;
// };
// export default App;

import React, { useState, useEffect } from "react";
import { Badge, Calendar } from "antd";
import { supabase } from "../config/supabaseClient";
import Sidebar from "../components/Sidebar";

const Calendar = () => {
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
        <Calendar cellRender={dateCellRender} />
      </Sidebar>
    </>
  );
};

export default Calendar;

// line 234,
// select column availableday and show to calendar
