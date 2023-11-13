import React, { useEffect, useState } from "react";
import "./KanbanColumn.css";
import KanbanCard from "./KanbanCard";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import SignalCellularAlt1BarIcon from '@mui/icons-material/SignalCellularAlt1Bar';
import SignalCellularAlt2BarIcon from '@mui/icons-material/SignalCellularAlt2Bar';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import DownloadingIcon from '@mui/icons-material/Downloading';
import RestoreIcon from '@mui/icons-material/Restore';



const iconStyle = {
  color: '#454545',
  fontSize: 'medium'
}

const priorityIcons = [<MoreHorizIcon style={iconStyle}/>, <PriorityHighIcon style={{color: '#ee2e24', fontSize: 'medium'}}/>, <SignalCellularAltIcon style={iconStyle}/>, <SignalCellularAlt2BarIcon style={iconStyle}/>, <SignalCellularAlt1BarIcon style={iconStyle}/>]
const statusIcons = [<PanoramaFishEyeIcon style={iconStyle} />,<DownloadingIcon style={iconStyle}/>, <RestoreIcon style={iconStyle}/>, ]




function KanbanColumn(props) {
  const [data, setData] = useState(props.tasks);

  const sortAccToTitle = () => {
    const sortedTickets = props.tasks.sort((a, b) => {
      // Convert both titles to lowercase for case-insensitive sorting
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();

      return titleA.localeCompare(titleB);
    });
    setData(sortedTickets);
  };

  const sortAccToPriority = () => {
    const sortedTickets = props.tasks.sort((a, b) => b.priority - a.priority);
    // console.log(sortedTickets);
    setData(sortedTickets);
  };

  useEffect(() => {
    if (props.sort === "priority") {
      sortAccToPriority();
    } else {
      sortAccToTitle();
    }
  }, [props.sort]);

  const priorityHeading = ["No Priority", "Urgent", "High", "Medium", "Low"];

  return (
    <div className="kanbanColumn">
      <div className="column-heading">
        <div className="column-heading-left">
          {props.groupBasis === "priority" && (
            <>
          {props?.icons[props?.index]}
            <p className="column-heading-text">{priorityHeading[props.columnHeading]}</p>
              </>
          )}
          {props.groupBasis === "status" && (
            <>
            {props?.icons[props?.index]}
            <p className="column-heading-text">{props?.columnHeading}</p>
            </>
          )}
          {props.groupBasis === "userId" && (
            <>
              <div className="display-pic">
                <p>
                  {props.userData
                    .filter((user) => user.id === props.columnHeading)[0]
                    ?.name.split(" ")
                    .map((word) => word[0])
                    .join("")}
                </p>
                <div
                  className={
                    props.userData.filter(
                      (user) => user.id === props.columnHeading
                    )[0]?.available
                      ? "online-status available"
                      : "online-status unavailable"
                  }
                ></div>
              </div>
              <p className="column-heading-text">
                {
                  props.userData.filter(
                    (user) => user.id === props.columnHeading
                  )[0]?.name
                }
              </p>
            </>
          )}
          <p>{data.length}</p>
        </div>
        <div className="column-heading-right">
          <AddIcon fontSize="small" style={{color:"#454545"}}/>
          <MoreHorizIcon fontSize="small" style={{color:"#454545"}}/>
          {/* <p>{props.columnHeading}</p> */}
        </div>
      </div>
      {data.map((task) => {
        return (
          <KanbanCard
            userData={props.userData.filter((user) => user.id === task.userId)}
            groupBasis={props.groupBasis}
            key={task.id}
            data={task}
            icons={priorityIcons}
          />
        );
      })}
    </div>
  );
}

export default KanbanColumn;

{
  /* <p>Heading = {props?.heading}</p> */
}
{
  /* <p>status = {task?.status}</p>
            <p>priority = {task?.priority}</p>
            <p>userId = {task?.userId}</p>
            <p>{task?.title}</p>
            <br />
            <br /> */
}
