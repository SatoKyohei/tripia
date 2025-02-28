"use client";
import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import PlanListCards from "@/components/layouts/PlanListCards";
import BasicFilter from "@/components/elements/Filter/Basic/BasicFilter";
import BasicSort from "@/components/elements/Sort/Basic/BasicSort";

const PlanListPage = () => {
    const [plans, setPlans] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/plans`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                });
                const data = await response.json();
                setPlans(data);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <Container sx={{ marginTop: 5 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <BasicSort />
                <BasicFilter />
            </Box>
            <Box sx={{ marginTop: 10 }}>
                <PlanListCards plans={plans} />
            </Box>
        </Container>
    );
};

export default PlanListPage;
