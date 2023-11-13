import React from "react";
import "./KanbanCard.css";
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

const statusIcons = [<PanoramaFishEyeIcon style={iconStyle} />,<DownloadingIcon style={iconStyle}/>, <RestoreIcon style={iconStyle}/>, ]




function KanbanCard(props) {
  return (
    <div className="kanban-card">
      <div className="kanban-card-top-bar">
        <p>{props.data?.id}</p>
        {props.groupBasis !== "userId" && (
          <div className="display-pic">
            <p>{props.userData[0]
                    ?.name.split(" ")
                    .map((word) => word[0])
                    .join("")}</p>
            <div
              className={
                props.userData[0]?.available
                  ? "online-status available"
                  : "online-status unavailable"
              }
            ></div>
          </div>
        )}
      </div>
          <div className="kanban-card-middle-bar">
              {props.groupBasis !== 'status' &&
          <p className="priority-icon">
          {props.data.status=='Todo'&&statusIcons[0]}
          {props.data.status=='In progress'&&statusIcons[1]}
          {props.data.status=='Backlog'&&statusIcons[2]}
          </p>
        }
        <p>{props.data?.title}</p>
      </div>
      <div className="kanban-card-bottom-bar">
        {props.groupBasis !== 'priority' &&
          <div className="more-icon">
            {props.icons[props.data.priority]}
            {/* <MoreHorizIcon fontSize="12px" style={{ color: "#828282" }} /> */}
          </div>
        }
        <div className="feature-btn">
          <div className="feature-dot"></div>
          <p>{props.data?.tag[0]}</p>
        </div>
      </div>
    </div>
  );
}

export default KanbanCard;
