"use client";
import { Container } from "@mui/material";
import { useEffect, useState, use } from "react";
import PlanDetail from "@/components/layouts/PlanDetail";
import { ChildPlan, ParentPlanDetail } from "@/types/type";
import { useAreaContext } from "@/contexts/AreaContext";

// 課題：ダミーの指定
// 課題：DetailPageButtonGroups ⇨ EditButtonにpropsを受け渡している。冗長な気がする。

const PlanDetailPage = ({ params }: { params: Promise<{ parentPlanId: string }> }) => {
    const [parentPlan, setParentPlan] = useState<ParentPlanDetail | null>(null);
    const [childPlans, setChildPlans] = useState<ChildPlan[] | null>(null);
    const { setAreaNames, setPrefectureNames } = useAreaContext();
    const { parentPlanId } = use(params);

    useEffect(() => {
        const fetchData = async () => {
            const planResponse = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/plans/${parentPlanId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                },
            );
            const planData = await planResponse.json();
            setParentPlan(planData.parentPlan);
            setChildPlans(planData.childPlans);

            const locationResponse = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/metadata/location`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                },
            );

            const locationData = await locationResponse.json();
            const { allAreaNames, allPrefectureNames } = locationData;
            setAreaNames(allAreaNames);
            setPrefectureNames(allPrefectureNames);
        };

        fetchData();
    }, [parentPlanId]);

    return (
        <Container sx={{ mt: 5 }}>
            <PlanDetail parentPlanWithAreaAndPrefecture={parentPlan} childPlans={childPlans} />
        </Container>
    );
};

export default PlanDetailPage;
