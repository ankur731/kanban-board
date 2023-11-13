import React, { useEffect, useState } from "react";
import "./TopBar.css";
import TuneIcon from '@mui/icons-material/Tune';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function TopBar(props) {
  const [displayState, setDisplayState] = useState("priority");
  const [sortState, setSortState] = useState("priority");
  const [toggleBox, setToggleBox] = useState(false);

  useEffect(() => {
    const storedDisplayState = localStorage.getItem("displayState");
    const storedSortState = localStorage.getItem("sortState");

    if (storedDisplayState) {
      setDisplayState(storedDisplayState);
    }
    if (storedSortState) {
      setSortState(storedSortState);
    }
  }, []);

  useEffect(() => {
    props.onStateUpdate(displayState);
    props.onSortUpdate(sortState);
  }, [displayState, sortState, props]);

  const handleDisplayChange = (event) => {
    const value = event.target.value;
    setDisplayState(value);
    localStorage.setItem("displayState", value);
  };
  
  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortState(value)
    localStorage.setItem("sortState", value);
  }

  return (
    <div className="topBar">
      <button onClick={() => setToggleBox(!toggleBox)} className="displayBtn"><TuneIcon fontSize="small" style={{ color: "#454545" }} /> Display{toggleBox?<KeyboardArrowUpIcon style={{ color: "#454545" }} />:<KeyboardArrowDownIcon style={{ color: "#454545" }} />}</button>

      <div className={toggleBox?'selection-box ':'selection-box toggleBox'}>
        <div className="group-select">
          <p>Grouping</p>
        <select onChange={handleDisplayChange} className="form-select">
          <option selected={displayState === "priority"} value="priority" className="grouping-option">
            Priority
          </option>
          <option selected={displayState === "status"} value="status" className="grouping-option">
            Status
          </option>
          <option selected={displayState === "userId"} value="userId" className="grouping-option">
            User
          </option>
        </select>
        </div>

        <div className="sort-select">
          <p>Sorting</p>
        <select onChange={handleSortChange}  className="form-select">
          <option selected={sortState === "priority"} value="priority">
            Priority
          </option>
          <option selected={sortState === "title"} value="title">
            Title
          </option>
        </select>
        </div>

        

      </div>
    </div>
  );
}

export default TopBar;
