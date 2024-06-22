import React from 'react'
// Interal Components
import MessageTemplateCard from '@/components/Cards/DashboardCards/DashboardHomeCards/MessageTemplateCard/MessageTemplateCard';
import Carousel from '@/components/Carousels/Carousel/Carousel';

// DUMMY DATA
const DUMMY_TEMPLATES = [
    {
        _id: Math.random().toString(),
        title: "Short Networking Follow-Up",
        message: "Hi [Name], it was great meeting you at [Event]. Looking forward to staying in touch!",
        targetAudience: "Networking",
        createdAt: 'May 21, 2024',
        updatedAt: 'June 4, 2024'
    },
    {
        _id: Math.random().toString(),
        title: "Job Application Follow-Up",
        message: "Dear [Hiring Manager],\n\nI recently applied for the [Position] role at [Company] and wanted to follow up on my application. I am very excited about the opportunity to join your team and contribute to [Company]'s success. My background in [Relevant Skill/Experience] makes me a strong candidate for this position. Please let me know if there are any updates regarding my application status. Thank you for considering my application.\n\nBest regards,\n[Your Name]",
        targetAudience: "Job Application",
        createdAt: 'Jan 12, 2024',
        updatedAt: ''
    },
    {
        _id: Math.random().toString(),
        title: "Comprehensive Cover Letter",
        message: "Dear [Hiring Manager],\n\nI am writing to express my interest in the [Position] role at [Company], as advertised on [Job Board/Company Website]. With a strong background in [Your Field] and a passion for [Industry/Field], I am excited about the opportunity to contribute to [Company]'s innovative projects.\n\nThroughout my career, I have developed a comprehensive skill set that includes [Skill 1], [Skill 2], and [Skill 3]. At my current role at [Current Company], I successfully [describe a significant achievement or responsibility]. These experiences have equipped me with the ability to [relevant skill or responsibility].\n\nWhat particularly excites me about this role is [specific aspect of the job or company]. I am drawn to [Company]'s commitment to [Company Value/Project] and believe that my background in [Relevant Experience] aligns well with your team's goals.\n\nI am confident that my skills and experiences make me a strong candidate for this position. I look forward to the opportunity to discuss how I can contribute to [Company] in more detail. Thank you for considering my application.\n\nSincerely,\n[Your Name]",
        targetAudience: "Job Application",
        createdAt: 'Feb 26, 2024',
        updatedAt: 'Apr 9, 2024'
    },
];
export default function DashboardHomeTemplates() {
    //TODO: fetch data here for recent templates 

    if(DUMMY_TEMPLATES.length === 0){
        return(
            <div>
                <p> Hmm, looks like you haven&apos;t created any message templates yet...</p>
                <p> Click here to create a template.</p>
            </div>
        )
    }

  return (
        <Carousel>
            {DUMMY_TEMPLATES.map((template) =>
                <MessageTemplateCard
                    _id={template._id.toString()}
                    key={template._id} 
                    title={template.title}
                    message={template.message}
                    targetAudience={template.targetAudience}
                    createdAt={template.createdAt}
                    updatedAt={template.updatedAt}             
                />
            )}
        </Carousel>
  )
}
