"use client";
import { Container } from "@mui/material";
import { useEffect, useState, use } from "react";
import DetailPageButtonGroups from "@/components/elements/Button/DetailPageButtonGroups";
import PlanDetail from "@/components/layouts/PlanDetail";
import { ChildPlan, ParentPlan } from "@/types/type";
import { useAreaContext } from "@/contexts/AreaContext";

// 課題：ダミーの指定
// 課題：DetailPageButtonGroups ⇨ EditButtonにpropsを受け渡している。冗長な気がする。

const PlanDetailPage = ({ params }: { params: Promise<{ planId: string }> }) => {
    const [parentPlan, setParentPlan] = useState<ParentPlan | null>(null);
    const [childPlans, setChildPlans] = useState<ChildPlan[] | null>(null);
    const { setAreaNames, setPrefectureNames } = useAreaContext();
    const { planId } = use(params);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/plans/${planId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const data = await response.json();
            setParentPlan(data.parentPlan);
            setChildPlans(data.childPlans);
            setAreaNames(data.allAreaNames);
            setPrefectureNames(data.allPrefectureNames);
        };
        fetchData();
    }, [planId]);

    return (
        <Container sx={{ mt: 5 }}>
            <PlanDetail parentPlan={parentPlan} childPlans={childPlans} />
            <DetailPageButtonGroups planId={planId} />
        </Container>
    );
};

export default PlanDetailPage;
