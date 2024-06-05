'use client'
import styles from './CopyTextButton.module.css'
import { useState } from 'react';
// External Libraries
import { IconCopy,  IconCircleDashedCheck } from '@tabler/icons-react';

interface CopyTextButton {
    textToCopy: string
}

export default function CopyTextButton({ textToCopy }: CopyTextButton) {
  const [copied, setCopied] = useState(false);

  const iconSize = 18;

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500); // reset after 2.5 seconds
    });
  };

  return (
    <button onClick={handleCopy} className={styles.copy_button_container}>
      <span className={styles.copy_text}>{copied ? 'Copied!' : ''}</span>
      {copied ? <IconCircleDashedCheck size={iconSize} className={styles.icon_success} /> : <IconCopy size={iconSize} /> }

    </button>
  );
}
