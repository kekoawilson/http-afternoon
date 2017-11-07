import React, { Component } from 'react';
import Hero from './subcomponents/Hero';
import BlogThumb from './subcomponents/BlogThumb';
import axios from 'axios';


class Home extends Component {
    constructor() {
        super();
        this.state = {
            index: 0,
            posts: [{ title: "Loading...", image: 'https://unsplash.it/900/400/?random' }]
        }
    }

    componentWillMount() {
        let promise = axios.get('/api/featured')
        promise.then(results => {
            this.setState({
                index: (~~(Math.random() * results.data.length) + 0),
                posts: results.data
            })
        }).catch(console.log)
    }


    render() {

        const posts = this.state.posts.map((e, i) => {
            <BlogThumb key={i} blog={e} />
        })

        return (
            <div className="content" >
                <Hero blog={this.state.posts[this.state.index]} />
                <hr />
                <div className="blog-grid">
                    {/* put your mapped blogs here */}
                    {posts}
                </div>
            </div>
        )
    }
}

export default Home;