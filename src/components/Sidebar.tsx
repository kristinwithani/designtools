import AnimationPanel from './AnimationPanel';
import ExportMenu from './ExportMenu';
import type { ExportFormat } from './ExportMenu';
import type { AnimationParams } from '../utils/animationUtils';

interface SidebarProps {
  animationParams: AnimationParams;
  onAnimationChange: (params: AnimationParams) => void;
  onDownloadAll: (format: ExportFormat) => void;
  isExporting: boolean;
}

export default function Sidebar({
  animationParams,
  onAnimationChange,
  onDownloadAll,
  isExporting,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-label">animation</div>
        <AnimationPanel params={animationParams} onChange={onAnimationChange} />
      </div>
      <div className="sidebar-section sidebar-export">
        <div className="sidebar-label">export</div>
        {isExporting ? (
          <div className="sidebar-exporting">
            <span className="spinner" /> exporting...
          </div>
        ) : (
          <ExportMenu variant="toolbar" onExport={onDownloadAll} />
        )}
      </div>
    </aside>
  );
}