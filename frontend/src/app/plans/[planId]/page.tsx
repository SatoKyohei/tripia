"use client";
import { Container } from "@mui/material";
import { useEffect, useState, use } from "react";
import DetailPageButtonGroups from "@/components/elements/Button/DetailPageButtonGroups";
import PlanDetail from "@/components/layouts/PlanDetail";
import { ParentPlan } from "@/types/type";

// 課題：ダミーの指定
// 課題：DetailPageButtonGroups ⇨ EditButtonにpropsを受け渡している。冗長な気がする。

const PlanDetailPage = ({ params }: { params: Promise<{ planId: string }> }) => {
    const [plan, setPlan] = useState<ParentPlan | null>(null);
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

            setPlan(data.parentPlan);
        };
        fetchData();
    }, [planId]);


    return (
        <Container sx={{ mt: 5 }}>
            <PlanDetail plan={plan} />
            <DetailPageButtonGroups planId={planId} />
        </Container>
    );
};

export default PlanDetailPage;
