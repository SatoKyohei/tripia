import React, { createContext, ReactNode, useContext, useState } from "react";

type AreaContextType = {
    areaNames: string[];
    setAreaNames: React.Dispatch<React.SetStateAction<string[]>>;
    prefectureNames: string[];
    setPrefectureNames: React.Dispatch<React.SetStateAction<string[]>>;
};

const AreaContext = createContext<AreaContextType | undefined>(undefined);

export const AreaProvider = ({ children }: { children: ReactNode }) => {
    const [areaNames, setAreaNames] = useState<string[]>([]);
    const [prefectureNames, setPrefectureNames] = useState<string[]>([]);

    return (
        <AreaContext.Provider
            value={{ areaNames, setAreaNames, prefectureNames, setPrefectureNames }}
        >
            {children}
        </AreaContext.Provider>
    );
};

export const useAreaContext = () => {
    const context = useContext(AreaContext);
    if (context === undefined) {
        throw new Error("useAreaContext must be used within an AreaProvider");
    }
    return context;
};
