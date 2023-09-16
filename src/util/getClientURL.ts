"use client";

const getClientURL = () => process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000";

export default getClientURL;
