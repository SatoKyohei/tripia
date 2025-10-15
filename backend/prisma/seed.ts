import bcrypt from "bcryptjs";
import prisma from "../src/lib/PrismaClient";

enum PlanStatus {
    Draft = "Draft",
    Published = "Published",
}

async function main() {
    // User
    const userData = [{ name: "user1", email: "user1@example.com", password: "user1" }];

    const hashedUsers = await Promise.all(
        userData.map(async (user) => ({
            ...user,
            password: await bcrypt.hash(user.password, 10),
        })),
    );

    for (const user of hashedUsers) {
        await prisma.user.upsert({
            where: { email: user.email },
            update: {},
            create: user,
        });
    }

    // Prefecture
    const prefectureData = [
        { prefectureId: "tokyo", prefectureName: "東京" },
        { prefectureId: "chiba", prefectureName: "千葉" },
        { prefectureId: "kanagawa", prefectureName: "神奈川" },
        { prefectureId: "saitama", prefectureName: "埼玉" },
        { prefectureId: "gunnma", prefectureName: "群馬" },
        { prefectureId: "ibaragi", prefectureName: "茨城" },
        { prefectureId: "tochigi", prefectureName: "栃木" },
    ];

    for (const prefecture of prefectureData) {
        await prisma.prefecture.upsert({
            where: { prefectureId: prefecture.prefectureId },
            update: {},
            create: prefecture,
        });
    }

    // Area
    const areaData = [
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

    for (const area of areaData) {
        await prisma.area.upsert({
            where: { areaId: area.areaId },
            update: {},
            create: area,
        });
    }

    // Concept
    const conceptData = [
        { conceptId: "relax", conceptName: "リラックス" },
        { conceptId: "active", conceptName: "アクティブな旅行" },
        { conceptId: "interaction", conceptName: "現地で交流" },
        { conceptId: "gourmet", conceptName: "現地のグルメ" },
        { conceptId: "shoestringTrip", conceptName: "貧乏旅行" },
    ];

    for (const concept of conceptData) {
        await prisma.concept.upsert({
            where: { conceptId: concept.conceptId },
            update: {},
            create: concept,
        });
    }

    // ParentPlan
    const plans = [
        {
            email: "user1@example.com",
            startAreaId: "tokyo_toshinn",
            endAreaId: "gunnma_seimou",
            conceptId: "relax",
            planName: "群馬西毛エリアのリラックス温泉旅行",
            planThumbnail:
                "https://tripia-bucket.s3.ap-northeast-1.amazonaws.com/testData/gunmma-onsen.jpg",
            startDateTime: "2025-02-28T09:00:00+09:00",
            endDateTime: "2025-03-02T18:00:00+09:00",
            purpose: "家族4人で温泉",
            status: PlanStatus.Published,
            createdAt: new Date(),
        },
        {
            email: "user1@example.com",
            startAreaId: "tokyo_fukutoshinn",
            endAreaId: "chiba_minamibousou",
            conceptId: "active",
            planName: "南房総グルメと鴨川シーワールド",
            planThumbnail:
                "https://tripia-bucket.s3.ap-northeast-1.amazonaws.com/testData/Kamogawa-Sea-World.webp",
            startDateTime: "2025-03-21T08:30:00+09:00",
            endDateTime: "2025-03-23T20:00:00+09:00",
            purpose: "友達と3人で行くアクティブな旅行",
            status: PlanStatus.Draft,
            createdAt: new Date(new Date().getTime() + 1000 * 60), // ソート検証のため意図的に時間をずらす
        },
        {
            email: "user1@example.com",
            startAreaId: "kanagawa_yokohama",
            endAreaId: "kanagawa_yokohama",
            conceptId: "shoestringTrip",
            planName: "地元横浜の一人観光名所巡り",
            planThumbnail:
                "https://tripia-bucket.s3.ap-northeast-1.amazonaws.com/testData/yokohama-hammer-head-8.webp",
            startDateTime: "2025-04-21T10:00:00+09:00",
            endDateTime: "2025-04-21T18:00:00+09:00",
            purpose: "なるべくお金をかけずに観光スポットを巡る",
            status: PlanStatus.Published,
            createdAt: new Date(new Date().getTime() + 1000 * 60 * 60), // ソート検証のため意図的に時間をずらす
        },
    ];

    const users = await prisma.user.findMany({
        where: { email: { in: userData.map((user) => user.email) } },
    });

    const plansWithUserId = plans.map((plan) => {
        const user = users.find((user) => user.email === plan.email);
        if (!user) {
            throw new Error(`User not found: ${plan.email}`);
        }
        
        return {
            ...plan,
            userId: user.userId,
        };
    });

    await prisma.parentPlan.createMany({
        data: plansWithUserId.map(({ email, ...rest }) => rest),
        skipDuplicates: true,
    });

    // ChildPlan
    const parentPlans = await prisma.parentPlan.findMany();

    const childPlansData = [
        {
            parentPlanId: parentPlans[0].parentPlanId,
            userId: parentPlans[0].userId,
            order: 1,
            locationName: "行きの移動",
            checkInTime: "2025-02-28T09:00:00+09:00",
            checkOutTime: "2025-02-28T11:30:00+09:00",
            memo: "",
        },
        {
            parentPlanId: parentPlans[0].parentPlanId,
            userId: parentPlans[0].userId,
            order: 2,
            locationName: "◯◯旅館",
            checkInTime: "2025-02-28T11:30:00+09:00",
            checkOutTime: "2025-03-02T16:00:00+09:00",
            memo: "先に荷物だけ置かせてもらう",
        },
        {
            parentPlanId: parentPlans[0].parentPlanId,
            userId: parentPlans[0].userId,
            order: 3,
            locationName: "帰りの移動",
            checkInTime: "2025-03-02T16:00:00+09:00",
            checkOutTime: "2025-03-02T18:30:00+09:00",
            memo: "",
        },
        {
            parentPlanId: parentPlans[1].parentPlanId,
            userId: parentPlans[1].userId,
            order: 1,
            locationName: "行きの移動",
            checkInTime: "2025-03-21T08:30:00+09:00",
            checkOutTime: "2025-03-21T10:30:00+09:00",
            memo: "",
        },
        {
            parentPlanId: parentPlans[1].parentPlanId,
            userId: parentPlans[1].userId,
            order: 2,
            locationName: "ホテル◯◯",
            checkInTime: "2025-03-21T10:30:00+09:00",
            checkOutTime: "2025-03-23T18:00:00+09:00",
            memo: "当日受け付けにて支払い",
        },
        {
            parentPlanId: parentPlans[1].parentPlanId,
            userId: parentPlans[1].userId,
            order: 3,
            locationName: "帰りの移動",
            checkInTime: "2025-03-23T18:00:00+09:00",
            checkOutTime: "2025-03-23T20:00:00+09:00",
            memo: "",
        },
        {
            parentPlanId: parentPlans[2].parentPlanId,
            userId: parentPlans[2].userId,
            order: 1,
            locationName: "行きの移動",
            checkInTime: "2025-04-21T10:00:00+09:00",
            checkOutTime: "2025-04-21T10:30:00+09:00",
            memo: "",
        },
        {
            parentPlanId: parentPlans[2].parentPlanId,
            userId: parentPlans[2].userId,
            order: 2,
            locationName: "◯◯公園",
            checkInTime: "2025-04-21T10:30:00+09:00",
            checkOutTime: "2025-04-21T17:30:00+09:00",
            memo: "",
        },
        {
            parentPlanId: parentPlans[2].parentPlanId,
            userId: parentPlans[2].userId,
            order: 3,
            locationName: "帰りの移動",
            checkInTime: "2025-04-21T17:30:00+09:00",
            checkOutTime: "2025-04-21T18:00:00+09:00",
            memo: "",
        },
    ];

    await prisma.childPlan.createMany({
        data: childPlansData,
        skipDuplicates: true,
    });
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
