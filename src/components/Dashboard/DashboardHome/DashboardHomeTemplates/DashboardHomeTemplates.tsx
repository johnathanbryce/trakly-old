'use client'
import React from 'react'
// Interal Components
import MessageTemplateCard from '@/components/Cards/DashboardCards/MessageTemplateCard/MessageTemplateCard';
import Carousel from '@/components/Carousels/Carousel/Carousel';
import LoaderSpinner from '@/components/Loaders/LoaderSpinner/LoaderSpinner';
// Custom Hooks
import { useFetchData } from '@/hooks/useFetchData';
// Recoil State
import { templatesState } from '@/recoil/dataFetchAtoms';
import { useRecoilValue } from 'recoil';
// Types
import MessageTemplate from '@/types/messageTemplate';

export default function DashboardHomeTemplates() {
    const limit = 5;
    const { data: companies, error, loading } = useFetchData<MessageTemplate[]>(`http://localhost:8000/api/messages?limit=${limit}`, templatesState); 
    // recoil global state (to update on deletion of messages)
    const recoilMessageTemplates = useRecoilValue(templatesState);

    if (loading) {
        return <LoaderSpinner />;
    }
    
    if (error) {
        return <h6>Error fetching message templates data... please try again</h6>;
    }
    
    if (!recoilMessageTemplates.data || recoilMessageTemplates.data.length === 0) {
        return (
          <div>
            <p>Looks like you haven&apos;t added any message templates yet...</p>
            <p>Click here to add create a message template.</p>
          </div>
        );
    }

  return (
        <Carousel>
            {recoilMessageTemplates.data && recoilMessageTemplates.data.map((template: MessageTemplate) =>
                <MessageTemplateCard
                    template_id={template.template_id}
                    key={template.template_id} 
                    title={template.title}
                    message={template.message}
                    target_audience={template.target_audience}
                    created_at={template.created_at}
                    updated_at={template.updated_at}             
                />
            )}
        </Carousel>
  )
}
