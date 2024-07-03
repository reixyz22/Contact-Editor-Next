'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ContactPage from "@/app/contacts/[email]/page";
import {useDispatch} from "react-redux";
import {clearEmail} from "@/app/store";

type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

type EditPageProps = {
    emailProp?: string; // Prop to accept email optionally
    editProp?: boolean; // if this is true we're not going to show the edit page yet
};

const EditPage: React.FC<EditPageProps> = ({ emailProp, editProp }) => {
    //these lines handle getting email prop, either as an arg from dyna or from the url
    const params = useParams();
    const emailFromParams = decodeURIComponent(params.email as string); // Decode the email parameter from URL
    const email = emailProp || emailFromParams; // Use prop email if available, otherwise use URL parameter

    const dispatch = useDispatch();
    const handleClearEmail = (email: string) => {
        dispatch(clearEmail(email));
    }

    if (!editProp) return <div></div>


    if (editProp) return(
        <h1 style={{color: 'darkblue'}}>{email}</h1>
    )

}
export default EditPage;