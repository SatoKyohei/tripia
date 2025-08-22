"use client";
import { Container } from "@mui/material";
import { useEffect, useState, use } from "react";
import PlanDetail from "@/components/layouts/PlanDetail";
import { ChildPlanType, ParentPlan } from "@/types/type";

// 課題：ダミーの指定
// 課題：DetailPageButtonGroups ⇨ EditButtonにpropsを受け渡している。冗長な気がする。

const PlanDetailPage = ({ params }: { params: Promise<{ parentPlanId: string }> }) => {
    const [parentPlan, setParentPlan] = useState<ParentPlan>();
    const [childPlans, setChildPlans] = useState<ChildPlanType[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [imageURL, setImageURL] = useState<string | null>(null);
    const { parentPlanId } = use(params);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("access_token");
            const planResponse = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/plans/${parentPlanId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    // credentials: "include",
                },
            );
            const planData = await planResponse.json();
            setParentPlan(planData.parentPlan);
            setChildPlans(planData.childPlans);
        };

        fetchData();
    }, [parentPlanId]);

    return (
        <Container sx={{ mt: 5 }}>
            {parentPlan && (
                <PlanDetail
                    parentPlan={parentPlan}
                    childPlans={childPlans}
                    setChildPlans={setChildPlans}
                    setFile={setFile}
                    imageURL={imageURL}
                    setImageURL={setImageURL}
                />
            )}
        </Container>
    );
};

export default PlanDetailPage;
