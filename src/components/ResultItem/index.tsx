import * as React from 'react'

import './styles.scss'

interface IProps {
    title?: string
    description?: string
    author?: string
    categories?: any
    image?: any
}

export default class ResultItem extends React.PureComponent<IProps> {
    static defaultProps = {}

    constructor(props: IProps) {
        super(props)
    }

    renderCategories(categories) {
        let categoryArray = []
        // categories = {
        //     '': '',
        //     '9': 'Business',
        // }
        for (let prop in categories) {
            let category = categories[prop]
            if (category !== '') {
                categoryArray.push(category)
            }
        }
        if (categoryArray.length === 0) {
            return (
                <div className="result-category no-category">No Categories</div>
            )
        }
        return categoryArray.map((cat) => (
            <div className="result-category">{cat}</div>
        ))
    }

    render() {
        const { title, description, author, categories, image } = this.props
        // const { open } = this.state
        return (
            <div className="result">
                <div className="result-cover-art">
                    <img
                        draggable={false}
                        height={140}
                        width={140}
                        src={image}
                    />
                </div>
                <div className="result-info">
                    <div className="result-title">{title}</div>
                    <p>by {author}</p>
                    <div className="result-categories">
                        {this.renderCategories(categories)}
                    </div>
                    <p className="result-description">{description}</p>
                </div>
            </div>
        )
    }
}