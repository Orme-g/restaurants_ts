// import React, { useState } from "react";

// import {
//     ListSubheader,
//     MenuItem,
//     ListItemIcon,
//     ListItemText,
//     SelectChangeEvent,
//     Select,
// } from "@mui/material";
// import SubwayIcon from "../../Components/svg/subwayIcon";

// import type { ISubway } from "../../data/subwaysLists";

// interface ISubwaySelectListProps {
//     stationsList: ISubway;
//     setSubwayName?: any;
// }

// enum TSubwayColors {
//     Red = "#D70138",
//     Blue = "#0079CA",
//     Green = "#019C47",
//     Orange = "#EB7220",
//     Purple = "#6D2781",
// }

// const SubwaySelectList: React.FC<ISubwaySelectListProps> = ({ stationsList, setSubwayName }) => {
//     let data = Object.values(stationsList);
//     const [subway, setSubway] = useState("");
//     const handleSelectSubway = (event: SelectChangeEvent) => {
//         setSubway(event.target.value as string);
//         setSubwayName(event.target.value);
//     };

// function checkSpbColor(station: string) {
//     if (station === "Линия 1") {
//         return TSubwayColors.Red;
//     }
//     if (station === "Линия 2") {
//         return TSubwayColors.Blue;
//     }
//     if (station === "Линия 3") {
//         return TSubwayColors.Green;
//     }
//     if (station === "Линия 4") {
//         return TSubwayColors.Orange;
//     }
//     if (station === "Линия 5") {
//         return TSubwayColors.Purple;
//     }
// }
// const outputList = () => {
//     return data.map(([name, ...rest]) => {
//         <ListSubheader>{name}</ListSubheader>;
//         return rest.map((station) => (
//             <MenuItem value={station} key={station}>
//                 <ListItemIcon>
//                     {/* <SubwayIcon color={checkSpbColor(name)} /> */}
//                 </ListItemIcon>
//                 <ListItemText>{station}</ListItemText>
//             </MenuItem>
//         ));
//     });
// };

//     return (
//         <Select
//             id="select-subway"
//             value={subway}
//             onChange={handleSelectSubway}
//             renderValue={(selected) => selected}
//         >
//             {outputList()}
//         </Select>
//     );
// };

// export default SubwaySelectList;
