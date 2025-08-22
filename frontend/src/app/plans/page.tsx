"use client";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PlanListCards from "@/components/layouts/PlanListCards";
import BasicFilter from "@/components/elements/Filter/Basic/BasicFilter";
import BasicSort from "@/components/elements/Sort/Basic/BasicSort";
import BasicButton from "@/components/elements/Button/Basic/BasicButton";
import { ParentPlan } from "@/types/type";

const PlanListPage = () => {
    const [plans, setPlans] = useState<ParentPlan[]>([]);
    const [filter, setFilter] = useState("all");
    const [sort, setSort] = useState("新しい順");
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("access_token");

                if (!token) {
                    router.push("/login");
                    return;
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/plans`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    // credentials: "include",
                });

                if (response.ok) {
                    const data = await response.json();
                    setPlans(data);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchData();
    }, []);

    const filteredAndSortedPlans = useMemo(() => {
        return plans
            .filter((plan) => filter === "all" || plan.status === filter)
            .sort((a, b) => {
                if (sort === "新しい順") {
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                } else if (sort === "古い順") {
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                }
                return 0;
            });
    }, [plans, sort, filter]);

    return (
        <Container maxWidth="lg" sx={{ mt: 5, mb: 8 }}>
            {/* タイトル */}
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                プラン一覧
            </Typography>
            <Divider sx={{ mb: 4 }} />

            {/* ソート・フィルター操作 */}
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", sm: "center" }}
            >
                <Stack direction="row" spacing={2}>
                    <BasicSort onChange={setSort} />
                    <BasicFilter onChange={setFilter} />
                </Stack>
                <BasicButton
                    buttonName="プランを作成する"
                    color="success"
                    component="button"
                    href="/plans/create"
                    variant="contained"
                />
            </Stack>

            {/* プランカード一覧 */}
            <Box sx={{ mt: 6 }}>
                <PlanListCards plans={filteredAndSortedPlans} />
            </Box>
        </Container>
    );
};

export default PlanListPage;
