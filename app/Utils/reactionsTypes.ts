const reactionsType = ['like', 'love', 'haha', 'sad', 'angry'] as const

type ReactionTypes = typeof reactionsType[number]

export { reactionsType, ReactionTypes}