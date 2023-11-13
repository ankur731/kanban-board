import React, { useEffect, useState } from "react";
import "./KanbanBoard.css";
import axios from "axios";
import TopBar from "./TopBar";
import KanbanColumn from "./KanbanColumn";
import SignalCellularAlt1BarIcon from '@mui/icons-material/SignalCellularAlt1Bar';
import SignalCellularAlt2BarIcon from '@mui/icons-material/SignalCellularAlt2Bar';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
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



function KanbanBoard() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredColumn, setFilteredColumn] = useState([]);
  const [group, setGroup] = useState("priority");
  const [sort, setSort] = useState("priority");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      axios
        .get(`https://api.quicksell.co/v1/internal/frontend-assignment`) // Replace with your user ID or fetch method
        .then((response) => {
          setTasks(response.data.tickets);
          setUsers(response.data.users);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    fetchData();
  }, []);
  
 
  
    useEffect(() => {
      if (group === "priority") {
          setFilteredColumn(
            [...new Set(tasks.map((item) => item.priority))].sort()
        );
        } else if (group === "status") {
          setFilteredColumn([...new Set(tasks.map((item) => item.status))]);
        } else {
          setFilteredColumn([...new Set(tasks.map((item) => item.userId))]);
      }
    }, [group, sort, tasks]);
    
   
  return (
    <div className="kanbanBoard">
      <TopBar onStateUpdate={setGroup} onSortUpdate={setSort } />
      {loading ? (
      <p>Loading....</p>
    ) : (
      tasks.length > 0 ? (
        <div className="kanban-column-container">
          {filteredColumn.map((column, index) => {
            return (
              <KanbanColumn
                key={column}
                sort={sort}
                userData={users}
                icons={group==='status'?statusIcons:priorityIcons}
                index={index}
                columnHeading={column}
                groupBasis={group}
                tasks={tasks.filter((task) => task[group] === column)}
              />
            );
          })}
        </div>
      ) : (
        <p>No tasks available.</p>
      )
    )}
    </div>
  );
}

export default KanbanBoard;
