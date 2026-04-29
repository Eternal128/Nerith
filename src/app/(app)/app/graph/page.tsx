'use client'

import { useState } from 'react'
import { Search, ZoomIn, ZoomOut } from 'lucide-react'
import { PEOPLE } from '@/lib/fixtures/people'
import { PROJECTS } from '@/lib/fixtures/projects'
import { DECISIONS } from '@/lib/fixtures/decisions'
import { PULL_REQUESTS } from '@/lib/fixtures/pull-requests'

interface GraphNode {
  id: string
  type: string
  label: string
  x: number
  y: number
  color: string
  highlighted?: boolean
}

interface GraphEdge {
  id: string
  type: string
  from: string
  to: string
}

const NODE_COLORS: Record<string, string> = {
  Person: '#1f3a5f',
  Project: '#1f6b3a',
  Decision: '#991b1b',
  PullRequest: '#b45309',
  Issue: '#6b6b6b',
  Message: '#c9d4e3',
  Service: '#0a0a0b',
}

function buildGraphData(searchQuery: string) {
  const nodes: GraphNode[] = []
  const edges: GraphEdge[] = []
  const W = 800, H = 600

  PROJECTS.forEach((p, i) => {
    const angle = (i / PROJECTS.length) * Math.PI * 2
    nodes.push({
      id: p.id,
      type: 'Project',
      label: p.name,
      x: W / 2 + Math.cos(angle) * 200,
      y: H / 2 + Math.sin(angle) * 150,
      color: NODE_COLORS['Project'],
      highlighted: searchQuery ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) : false,
    })
  })

  DECISIONS.forEach((d, i) => {
    nodes.push({
      id: d.id,
      type: 'Decision',
      label: d.title.slice(0, 20) + '…',
      x: 80 + (i % 3) * 180,
      y: 60 + Math.floor(i / 3) * 100,
      color: NODE_COLORS['Decision'],
      highlighted: searchQuery ? d.title.toLowerCase().includes(searchQuery.toLowerCase()) : false,
    })
  })

  const keyPRs = PULL_REQUESTS.filter((p) => p.status === 'merged').slice(0, 8)
  keyPRs.forEach((p, i) => {
    nodes.push({
      id: p.id,
      type: 'PullRequest',
      label: `PR #${p.number}`,
      x: 650 + (i % 2) * 100,
      y: 100 + Math.floor(i / 2) * 80,
      color: NODE_COLORS['PullRequest'],
      highlighted: searchQuery ? `pr ${p.number}`.includes(searchQuery.toLowerCase()) : false,
    })

    if (p.projectId) {
      edges.push({ id: `e-pr-proj-${p.id}`, type: 'IMPLEMENTS', from: p.id, to: p.projectId })
    }

    if (p.number === 482) {
      edges.push({ id: 'e-contradicts-482-dec007', type: 'CONTRADICTS', from: p.id, to: 'dec-007' })
    }
  })

  PEOPLE.slice(0, 12).forEach((p, i) => {
    const angle = (i / 12) * Math.PI * 2
    nodes.push({
      id: p.id,
      type: 'Person',
      label: p.name.split(' ')[0],
      x: W / 2 + Math.cos(angle) * 350,
      y: H / 2 + Math.sin(angle) * 260,
      color: NODE_COLORS['Person'],
      highlighted: searchQuery ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) : false,
    })
  })

  if (searchQuery) {
    const q = searchQuery.toLowerCase()
    nodes.forEach((n) => {
      n.highlighted = n.label.toLowerCase().includes(q) || n.type.toLowerCase().includes(q)
    })
  }

  return { nodes, edges }
}

export default function GraphPage() {
  const [search, setSearch] = useState('')
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null)
  const [zoom, setZoom] = useState(1)

  const { nodes, edges } = buildGraphData(search)

  return (
    <div className="flex h-full">
      {/* Graph area */}
      <div className="flex-1 relative overflow-hidden">
        {/* Toolbar */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <div className="flex items-center gap-2 bg-[var(--color-paper)] border border-[var(--color-rule)] rounded-[8px] px-3 py-2">
            <Search className="w-3.5 h-3.5 text-[var(--color-muted)]" />
            <input
              type="text"
              placeholder='Search graph... (try "auth migration")'
              className="bg-transparent text-sm outline-none w-52 placeholder:text-[var(--color-muted)]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center bg-[var(--color-paper)] border border-[var(--color-rule)] rounded-[8px]">
            <button className="p-2 hover:bg-[var(--color-rule)] transition-colors rounded-l-[8px]" onClick={() => setZoom((z) => Math.min(z + 0.2, 2))}>
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button className="p-2 hover:bg-[var(--color-rule)] transition-colors rounded-r-[8px]" onClick={() => setZoom((z) => Math.max(z - 0.2, 0.3))}>
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* SVG Graph */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 800 600"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
        >
          {edges.map((edge) => {
            const from = nodes.find((n) => n.id === edge.from)
            const to = nodes.find((n) => n.id === edge.to)
            if (!from || !to) return null
            const isContradicts = edge.type === 'CONTRADICTS'
            return (
              <g key={edge.id}>
                <line
                  x1={from.x} y1={from.y}
                  x2={to.x} y2={to.y}
                  stroke={isContradicts ? '#991b1b' : '#e3ddd0'}
                  strokeWidth={isContradicts ? 2.5 : 1}
                  strokeDasharray={isContradicts ? '6 3' : undefined}
                />
                {isContradicts && (
                  <text
                    x={(from.x + to.x) / 2}
                    y={(from.y + to.y) / 2 - 6}
                    textAnchor="middle"
                    fontSize="8"
                    fill="#991b1b"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    CONTRADICTS
                  </text>
                )}
              </g>
            )
          })}

          {nodes.map((node) => (
            <g
              key={node.id}
              onClick={() => setSelectedNode(selectedNode?.id === node.id ? null : node)}
              style={{ cursor: 'none' }}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={node.highlighted ? 12 : node.type === 'Project' ? 10 : 7}
                fill={node.highlighted ? node.color : `${node.color}33`}
                stroke={node.highlighted || selectedNode?.id === node.id ? node.color : '#e3ddd0'}
                strokeWidth={node.highlighted || selectedNode?.id === node.id ? 2.5 : 1}
              />
              <text
                x={node.x}
                y={node.y + (node.type === 'Project' ? 20 : 16)}
                textAnchor="middle"
                fontSize={node.type === 'Project' ? 10 : 8}
                fill="#0a0a0b"
                fontFamily={node.type === 'Project' ? 'DM Serif Display, serif' : 'Inter, sans-serif'}
              >
                {node.label}
              </text>
            </g>
          ))}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-[var(--color-paper)] border border-[var(--color-rule)] rounded-[8px] p-3">
          <div className="text-[10px] font-medium uppercase tracking-wider text-[var(--color-muted)] mb-2">Legend</div>
          <div className="space-y-1">
            {Object.entries(NODE_COLORS).map(([type, color]) => (
              <div key={type} className="flex items-center gap-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                <span>{type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel: node details */}
      <aside className="w-72 shrink-0 border-l border-[var(--color-rule)] p-4 overflow-y-auto">
        <div className="text-[10px] font-medium uppercase tracking-wider text-[var(--color-muted)] mb-3">
          {selectedNode ? 'Node Details' : 'Graph Overview'}
        </div>

        {selectedNode ? (
          <div className="space-y-3">
            <div>
              <div className="text-[10px] text-[var(--color-muted)]">Type</div>
              <div className="text-sm font-mono text-[var(--color-accent)]">{selectedNode.type}</div>
            </div>
            <div>
              <div className="text-[10px] text-[var(--color-muted)]">ID</div>
              <div className="text-xs font-mono">{selectedNode.id}</div>
            </div>
            <div>
              <div className="text-[10px] text-[var(--color-muted)]">Label</div>
              <div className="text-sm">{selectedNode.label}</div>
            </div>
          </div>
        ) : (
          <div className="space-y-2 text-sm text-[var(--color-muted)]">
            <p>Click any node to see details.</p>
            <p className="text-xs">
              Try searching for{' '}
              <span className="font-mono text-[var(--color-accent)]">auth migration</span>{' '}
              to highlight the contradiction between PR #482 and ADR-007.
            </p>
            <div className="card p-3 mt-4">
              <div className="text-xs font-medium mb-2">Graph Stats</div>
              <div className="grid grid-cols-2 gap-1 text-xs text-[var(--color-muted)]">
                <span>Nodes</span><span className="font-mono text-right">{nodes.length}</span>
                <span>Edges</span><span className="font-mono text-right">{edges.length}</span>
                <span>Projects</span><span className="font-mono text-right">{PROJECTS.length}</span>
                <span>Decisions</span><span className="font-mono text-right">{DECISIONS.length}</span>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  )
}
