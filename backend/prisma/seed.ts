import { prisma } from "../src/lib/PrismaClient";

async function main() {
    // User
    const users = await prisma.user.createMany({
        data: [
            { email: "sato@example.com", name: "sato", password: "sato" },
            { name: "tanaka", email: "tanaka@example.com", password: "tanaka" },
        ],
        skipDuplicates: true,
    });

    // Prefecture
    const prefectures = await prisma.prefecture.createMany({
        data: [
            { prefectureId: "tokyo", prefectureName: "東京" },
            { prefectureId: "chiba", prefectureName: "千葉" },
            { prefectureId: "kanagawa", prefectureName: "神奈川" },
            { prefectureId: "saitama", prefectureName: "埼玉" },
            { prefectureId: "gunnma", prefectureName: "群馬" },
            { prefectureId: "ibaragi", prefectureName: "茨城" },
            { prefectureId: "tochigi", prefectureName: "栃木" },
        ],
        skipDuplicates: true,
    });

    // Area
    const areas = await prisma.area.createMany({
        data: [
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
        ],
        skipDuplicates: true,
    });

    // Concept
    const concepts = await prisma.concept.createMany({
        data: [
            { conceptId: "relax", conceptName: "リラックス" },
            { conceptId: "active", conceptName: "アクティブな旅行" },
            { conceptId: "interaction", conceptName: "現地で交流" },
            { conceptId: "gourmet", conceptName: "現地のグルメ" },
            { conceptId: "shoestringTrip", conceptName: "貧乏旅行" },
        ],
        skipDuplicates: true,
    });

    // ParentPlan
    const parentPlans = await prisma.parentPlan.createMany({
        data: [
            {
                startAreaId: "tokyo_toshinn",
                endAreaId: "gunnma_seimou",
                conceptId: "relax",
                planName: "群馬西毛エリアのリラックス温泉旅行",
                startDateTime: "2025-02-28T09:00:00+09:00",
                endDateTime: "2025-03-02T18:00:00+09:00",
                purpose: "家族4人で温泉",
                status: "Draft",
            },
            {
                startAreaId: "tokyo_fukutoshinn",
                endAreaId: "chiba_minamibousou",
                conceptId: "active",
                planName: "南房総グルメと鴨川シーワールド",
                startDateTime: "2025-03-21T08:30:00+09:00",
                endDateTime: "2025-03-23T20:00:00+09:00",
                purpose: "友達と3人で行くアクティブな旅行",
                status: "Published",
            },
            {
                startAreaId: "kanagawa_yokohama",
                endAreaId: "kanagawa_yokohama",
                conceptId: "shoestringTrip",
                planName: "地元横浜の一人観光名所巡り",
                startDateTime: "2025-04-21T10:00:00+09:00",
                endDateTime: "2025-04-21T18:00:00+09:00",
                purpose: "なるべくお金をかけずに観光スポットを巡る",
                status: "Published",
            },
            {
                startAreaId: "saitama_toubu",
                endAreaId: "ibaragi_kennou",
                conceptId: "gourmet",
                planName: "大洗で海鮮食べ放題ツアー",
                startDateTime: "2025-06-21T10:30:00+09:00",
                endDateTime: "2025-06-21T17:00:00+09:00",
                status: "Published",
            },
        ],
        skipDuplicates: true,
    });

    // ChildPlan
    // const childPlans = await prisma.childPlan.createMany({
    //     data: [
    //         {
    //             parentPlanId: "",
    //             order: 1,
    //             locationName: "行きの移動",
    //             checkInTime: "2025-02-28 09:00:00",
    //             checkOutTime: "2025-02-28 11:30:00",
    //         },
    //         {
    //             parentPlanId: "",
    //             order: 2,
    //             locationName: "◯◯旅館",
    //             checkInTime: "2025-02-28 11:30:00",
    //             checkOutTime: "2025-03-02 16:00:00",
    //         },
    //         {
    //             parentPlanId: "",
    //             order: 3,
    //             locationName: "帰りの移動",
    //             checkInTime: "2025-03-02 16:00:00",
    //             checkOutTime: "2025-03-02 18:30:00",
    //         },
    //         {
    //             parentPlanId: "",
    //             order: 1,
    //             locationName: "行きの移動",
    //             checkInTime: "2025-03-21 08:30:00",
    //             checkOutTime: "2025-03-21 10:30:00",
    //         },
    //         {
    //             parentPlanId: "",
    //             order: 2,
    //             locationName: "ホテル◯◯",
    //             checkInTime: "2025-03-21 10:30:00",
    //             checkOutTime: "2025-03-23 18:00:00",
    //         },
    //         {
    //             parentPlanId: "",
    //             order: 3,
    //             locationName: "帰りの移動",
    //             checkInTime: "2025-03-23 18:00:00",
    //             checkOutTime: "2025-03-23 20:00:00",
    //         },
    //         {
    //             parentPlanId: "",
    //             order: 1,
    //             locationName: "行きの移動",
    //             checkInTime: "2025-04-21 10:00:00",
    //             checkOutTime: "2025-04-21 10:30:00",
    //         },
    //         {
    //             parentPlanId: "",
    //             order: 2,
    //             locationName: "◯◯公園",
    //             checkInTime: "2025-04-21 10:30:00",
    //             checkOutTime: "2025-04-21 17:30:00",
    //         },
    //         {
    //             parentPlanId: "",
    //             order: 3,
    //             locationName: "帰りの移動",
    //             checkInTime: "2025-04-21 17:30:00",
    //             checkOutTime: "2025-04-21 18:00:00",
    //         },
    //         {
    //             parentPlanId: "",
    //             order: 1,
    //             locationName: "行きの移動",
    //             checkInTime: "2025-06-21 10:30:00",
    //             checkOutTime: "2025-06-21 11:30:00",
    //         },
    //         {
    //             parentPlanId: "",
    //             order: 2,
    //             locationName: "◯◯漁港",
    //             checkInTime: "2025-06-21 11:30:00",
    //             checkOutTime: "2025-06-21 16:00:00",
    //         },
    //         {
    //             parentPlanId: "",
    //             order: 3,
    //             locationName: "帰りの移動",
    //             checkInTime: "2025-06-21 16:00:00",
    //             checkOutTime: "2025-06-21 17:00:00",
    //         },
    //     ],
    //     skipDuplicates: true,
    // });
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
