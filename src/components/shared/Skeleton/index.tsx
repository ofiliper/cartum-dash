import React from 'react'

interface SkeletonLoadingProps {
    width?: string
    height?: string
    borderRadius?: string
    backgroundColor?: string
    className?: string
}

const Skeleton: React.FC<SkeletonLoadingProps> = ({
    backgroundColor = 'bg-gradient-to-r from-stone-200 via-stone-200 to-stone-100',
    className,
}) => {
    return (
        <div
            className={`h-4 w-full rounded-lg p-4 ${backgroundColor} animate-pulse ${className || ''}`}
        />
    )
}

export default Skeleton
