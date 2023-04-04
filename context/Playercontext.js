import React, { useState } from "react";


const PlayerContext = React.createContext();

const PlayerProvider = ({ children }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [record, setRecord] = useState(0);
    const [docked, setDocked] = useState(0);
    return (
        <PlayerContext.Provider value={{ isModalVisible, setIsModalVisible, record, setRecord, docked, setDocked }}>
            {children}
        </PlayerContext.Provider>
    )
}
export { PlayerContext, PlayerProvider }