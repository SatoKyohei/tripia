import { Box, Container } from "@mui/material";
import PlanListCards from "@/components/layouts/PlanListCards";
import BasicFilter from "@/components/elements/Filter/Basic/BasicFilter";
import BasicSort from "@/components/elements/Sort/Basic/BasicSort";

const dummyPlans = [
    { id: 1, name: "Title1", content: "dummydummydummydummydummydummydummydummydummydummy" },
    { id: 2, name: "Title2", content: "dummydummydummydummydummydummydummydummydummydummy" },
    { id: 3, name: "Title3", content: "dummydummydummydummydummydummydummydummydummydummy" },
    { id: 4, name: "Title4", content: "dummydummydummydummydummydummydummydummydummydummy" },
    { id: 5, name: "Title5", content: "dummydummydummydummydummydummydummydummydummydummy" },
    { id: 6, name: "Title6", content: "dummydummydummydummydummydummydummydummydummydummy" },
    { id: 7, name: "Title7", content: "dummydummydummydummydummydummydummydummydummydummy" },
    { id: 8, name: "Title8", content: "dummydummydummydummydummydummydummydummydummydummy" },
];

const PlanListPage = () => {
    return (
        <Container sx={{ marginTop: 5}}>
            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                <BasicSort/>
                <BasicFilter />
            </Box>
            <Box sx={{ marginTop: 10 }}>
                <PlanListCards plans={dummyPlans} />
            </Box>
        </Container>
    );
};

export default PlanListPage;
