// エリアリストを定義
// 各エリアは後述のprefectureList.prefectureIdを含んでいます
export const areaList = [
    { areaId: "tokyo_toshinn", areaName: "都心3区", prefectureId: "tokyo" },
    { areaId: "tokyo_fukutoshinn", areaName: "副都心4区", prefectureId: "tokyo" },
    { areaId: "tokyo_seibu", areaName: "23区西部", prefectureId: "tokyo" },
    { areaId: "tokyo_toubu", areaName: "23区東部", prefectureId: "tokyo" },
    { areaId: "kanagawa_yokohama", areaName: "横浜エリア", prefectureId: "kanagawa" },
    { areaId: "kanagawa_kawasaki", areaName: "川崎エリア", prefectureId: "kanagawa" },
    { areaId: "kanagawa_shounan", areaName: "湘南エリア", prefectureId: "kanagawa" },
    { areaId: "kanagawa_kennou", areaName: "県央エリア", prefectureId: "kanagawa" },
    { areaId: "kanagawa_seisyou", areaName: "西湘エリア", prefectureId: "kanagawa" },
    { areaId: "chiba_chibashi", areaName: "千葉市エリア", prefectureId: "chiba" },
    { areaId: "chiba_higashikatsushika", areaName: "東葛飾エリア", prefectureId: "chiba" },
    { areaId: "chiba_minamibousou", areaName: "南房総エリア", prefectureId: "chiba" },
    { areaId: "chiba_kujuukuri", areaName: "九十九里エリア", prefectureId: "chiba" },
    { areaId: "saitama_saitama", areaName: "さいたまエリア", prefectureId: "saitama" },
    { areaId: "saitama_seibu", areaName: "西部エリア", prefectureId: "saitama" },
    { areaId: "saitama_toubu", areaName: "東部エリア", prefectureId: "saitama" },
    { areaId: "saitama_hokubu", areaName: "北部エリア", prefectureId: "saitama" },
    { areaId: "ibaragi_kennou", areaName: "県央エリア", prefectureId: "ibaragi" },
    { areaId: "ibaragi_kennnann", areaName: "県南エリア", prefectureId: "ibaragi" },
    { areaId: "ibaragi_rokkou", areaName: "鹿行エリア", prefectureId: "ibaragi" },
    { areaId: "ibaragi_kennsei", areaName: "県西エリア", prefectureId: "ibaragi" },
    { areaId: "tochigi_kennou", areaName: "県央エリア", prefectureId: "tochigi" },
    { areaId: "tochigi_kennnann", areaName: "県南エリア", prefectureId: "tochigi" },
    { areaId: "tochigi_kennhoku", areaName: "県北エリア", prefectureId: "tochigi" },
    { areaId: "gunnma_chuumou", areaName: "中毛エリア", prefectureId: "gunnma" },
    { areaId: "gunnma_toumou", areaName: "東毛エリア", prefectureId: "gunnma" },
    { areaId: "gunnma_seimou", areaName: "西毛エリア", prefectureId: "gunnma" },
    { areaId: "gunnma_hokumou", areaName: "北毛エリア", prefectureId: "gunnma" },
];

// 都道府県リストを定義
export const prefectureList = [
    { prefectureId: "tokyo", prefectureName: "東京" },
    { prefectureId: "chiba", prefectureName: "千葉" },
    { prefectureId: "kanagawa", prefectureName: "神奈川" },
    { prefectureId: "saitama", prefectureName: "埼玉" },
    { prefectureId: "gunnma", prefectureName: "群馬" },
    { prefectureId: "ibaragi", prefectureName: "茨城" },
    { prefectureId: "tochigi", prefectureName: "栃木" },
];

// エリアIDから都道府県IDを取得するユーティリティ関数
export const getPrefectureIdByAreaId = (id: string) => {
    const area = areaList.find((area) => area.areaId === id);
    return area?.prefectureId;
};

// 都道府県IDからエリアリストをフィルタリングするユーティリティ関数
export const getFilterdAreaList = (prefectureId: string | undefined) => {
    return areaList.filter((area) => area.prefectureId === prefectureId);
};
