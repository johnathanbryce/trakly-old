'use client'
import styles from './contacts.module.css'
// Interal Components
import DashboardContainerCard from '@/components/Cards/DashboardCards/DashboardContainerCard/DashboardContainerCard'
import MessageTemplateCard from '@/components/Cards/DashboardCards/MessageTemplateCard/MessageTemplateCard';
import LoaderSpinner from '@/components/Loaders/LoaderSpinner/LoaderSpinner';
// Custom Hooks
import { useFetchData } from '@/hooks/useFetchData';
// Recoil State
import { templatesState } from '@/recoil/dataFetchAtoms';
import { useRecoilValue } from 'recoil';
// Typesa
import MessageTemplate from '@/types/messageTemplate';
import DashboardContainerCardFullHeight from '@/components/Cards/DashboardCards/DashboardContainerCardFullHeight/DashboardContainerCardFullHeight';

export default function Companies() {
    const { data: contacts, error, loading } = useFetchData<MessageTemplate[]>(`http://localhost:8000/api/messages`, templatesState); 
    // recoil global state (to update on deletion of contacts)
    const recoilMessageTemplates = useRecoilValue(templatesState);

    if (loading) {
        return <LoaderSpinner />;
    }
    
    if (error) {
        return (
          <DashboardContainerCardFullHeight title='Message Templates' >
            <p>Error fetching message templates data... please try again </p>
          </DashboardContainerCardFullHeight>
        )
    }
    
    if (!recoilMessageTemplates.data || recoilMessageTemplates.data.length === 0) {
        return (
          <DashboardContainerCardFullHeight title='Message Templates' >
            <p>Hmm, looks like you haven&apos;t added any message templates yet...</p>
            <p>Click here to add a message template</p>
          </DashboardContainerCardFullHeight>
        );
      }

  return (
    <DashboardContainerCard title='Message Templates' isGridContainer={true} >
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
    </DashboardContainerCard>
  )
}
