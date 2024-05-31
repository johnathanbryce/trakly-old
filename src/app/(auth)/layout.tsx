
/* all logged out auth files receive this layout */
export default function LoggedInLayout({
    children,
  } : {
    children: React.ReactNode
  }) {;

  
    return (
      <>
        {children}
      </>
    )
  }