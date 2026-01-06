import { Panel } from '../components/ui/Panel';
import { GlitchButton } from '../components/ui/GlitchButton';
import { ToggleLeft, ToggleRight, Volume2, Monitor, AlertOctagon } from 'lucide-react';
import { useState } from 'react';

const SettingRow = ({ label, description, active, onToggle }: any) => (
  <div className="flex items-center justify-between p-4 border-b border-white/5 last:border-0">
    <div>
      <h4 className="font-display text-white">{label}</h4>
      <p className="text-xs font-mono text-gray-500">{description}</p>
    </div>
    <button onClick={onToggle} className={`transition-colors ${active ? 'text-neon' : 'text-gray-600'}`}>
      {active ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
    </button>
  </div>
);

export const Settings = () => {
  const [settings, setSettings] = useState({
    glitch: true,
    sound: true,
    notifications: false,
    highContrast: false
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h2 className="text-3xl font-display font-bold text-white mb-2">SYSTEM CONFIGURATION</h2>

      <Panel title="INTERFACE PARAMETERS" glow="cyan">
        <SettingRow 
          label="GLITCH INTENSITY" 
          description="Enable visual distortion artifacts" 
          active={settings.glitch} 
          onToggle={() => toggle('glitch')} 
        />
        <SettingRow 
          label="AUDIO FEEDBACK" 
          description="Enable UI interaction sounds" 
          active={settings.sound} 
          onToggle={() => toggle('sound')} 
        />
        <SettingRow 
          label="HIGH CONTRAST" 
          description="Reduce atmospheric effects for readability" 
          active={settings.highContrast} 
          onToggle={() => toggle('highContrast')} 
        />
      </Panel>

      <Panel title="DANGER ZONE" glow="red" className="border-blood/50">
        <div className="flex items-center justify-between p-4">
          <div>
            <h4 className="font-display text-blood font-bold">DISCONNECT FROM DIMENSION X</h4>
            <p className="text-xs font-mono text-gray-500">This will terminate your session and wipe local cache.</p>
          </div>
          <GlitchButton variant="danger">TERMINATE</GlitchButton>
        </div>
      </Panel>
    </div>
  );
};
