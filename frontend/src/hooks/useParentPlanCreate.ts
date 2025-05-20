// import cuid from "cuid";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { ParentPlan } from "@/types/type";

// export const useParentPlanCreate = () => {
//     const [plan, setPlan] = useState<ParentPlan>(parentPlan);
//     const router = useRouter();

//     useEffect(() => {
//         if (parentPlan) {
//             setPlan(parentPlan);
//         }
//     }, [parentPlan]);

//     const handleChange = async (parentPlanId: string, key: keyof ParentPlan, value: string) => {
//         const updatedPlan = { ...plan, [key]: value };

//         await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/plans/update`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             credentials: "include",
//             body: JSON.stringify(updatedPlan),
//         })
//             .then((response) => {
//                 return response;
//             })
//             .catch((error) => {
//                 console.error("Failed to save child plan");
//                 return;
//             });

//         setPlan(updatedPlan);
//     };

//     return { plan, setPlan, handleChange };
// };
