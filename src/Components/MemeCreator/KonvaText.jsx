import React, { useState, useEffect } from "react"
import { Text, Transformer } from "react-konva"

export default function KonvaText({ text, onSelect, isSelected }) {

	const [position, setPosition] = useState({ x: 0, y: 0 })
	const [currentText, setCurrentText] = useState(text)
	const [beingUsed, setBeingUsed] = useState(false)

	const transformRef = React.useRef()
	const textRef = React.useRef()

	useEffect(() => {
		if (isSelected) {
			transformRef.current.setNode(textRef.current)
			transformRef.current.getLayer().batchDraw()
		}
	}, [isSelected])

	return (
		<>
			<Text
				ref={textRef}
				text={currentText}
				draggable
				x={position.x}
				y={position.y}
				onDragEnd={e => {
					setPosition({ x: e.target.x(), y: e.target.y() })
				}}
				fontSize={30}
				// fill="white"
				onDblClick={() => { onSelect(); setBeingUsed(true) }}
			/>
			{isSelected && (
				<Transformer
					ref={transformRef}
					boundBoxFunc={(oldBox, newBox) => {
						// limit resize
						if (newBox.width < 5 || newBox.height < 5) {
							return oldBox;
						}
						return newBox;
					}}
				/>
			)}
		</>
	)
}