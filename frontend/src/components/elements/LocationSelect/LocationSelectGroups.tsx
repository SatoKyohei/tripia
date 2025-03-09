import { Stack } from "@mui/material";
import BasicLocationSelect from "@/components/elements/LocationSelect/Basic/BasicLocationSelect";

// 課題：ラベルはここに定義で本当に良いのか
const labels = {
    departure: "出発地（都道府県）",
    arrival: "到着地（都道府県）",
    departureArea: "出発地（エリア）",
    arrivalArea: "到着地（エリア）",
};

// 課題：ダミーデータ
const prefectures = [
    { id: 1, name: "東京" },
    { id: 2, name: "栃木" },
    { id: 3, name: "群馬" },
    { id: 4, name: "埼玉" },
    { id: 5, name: "千葉" },
    { id: 6, name: "神奈川" },
];
const areas = [
    { id: 1, name: "新宿" },
    { id: 2, name: "宇都宮" },
    { id: 3, name: "前橋" },
    { id: 4, name: "大宮" },
    { id: 5, name: "舞浜" },
    { id: 6, name: "横浜" },
];

type LocationSelectGroupsProps = {
    startPrefectureName?: string;
    startAreaName?: string;
    endPrefectureName?: string;
    endAreaName?: string;
};

const LocationSelectGroups = (props: LocationSelectGroupsProps) => {
    return (
        <>
            <Stack direction="row" spacing={3}>
                <BasicLocationSelect label={labels.departure} option={props.startPrefectureName} />
                <BasicLocationSelect label={labels.departureArea} option={props.startAreaName} />
            </Stack>
            <Stack direction="row" spacing={3}>
                <BasicLocationSelect label={labels.arrival} option={props.endPrefectureName} />
                <BasicLocationSelect label={labels.arrivalArea} option={props.endAreaName} />
            </Stack>
        </>
    );
};

export default LocationSelectGroups;
