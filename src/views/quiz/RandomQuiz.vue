<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-lg-6 offset-lg-3">
                <a-card>
                    <div class="card-header text-center">
                        <h4>Random Quiz</h4>
                    </div>
                    <div class="card-body p-3" v-if="isCompleted === 1">
                        <a-alert message="You are successfully completed your Quiz" type="success" />
                    </div>
                    <div class="card-body" v-else>
                        <form @submit.prevent="nextQuestion">
                            <div class="mb-2">
                                <input type="text" class="form-control" disabled v-model="quiz.question">
                            </div>
                            <div class="mb-2">
                                <a-radio-group v-model:value="selectedAnswer" @change="getSelected()">
                                    <a-radio v-for="answer in quiz.incorrectAnswers" :key="answer" :value="answer">{{answer}}</a-radio>
                                </a-radio-group>
                            </div>
                            <div class="mb-2">
                                <button type="submit" class="btn btn-primary">Next</button>
                            </div>
                        </form>
                    </div>
                </a-card>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            quiz: {},
            //isCompleted: false,
            //marks: 0,
            compiledAnswers: [],
            selectedAnswer: ''
        }
    },
    computed: {
        isCompleted() {
            return  this.$store.state.randomQuizRoute.isCompleted;
        },
        marks() {
            return this.$store.state.randomQuizRoute.marks;
        }
    },
    created(){
        this.$store.dispatch('randomQuizRoute/getTriviaApi').then(res => {
            this.quiz = this.$store.state.randomQuizRoute.quiz;
            this.compiledAnswers = this.quiz.incorrectAnswers.splice( Math.floor(Math.random() * this.quiz.incorrectAnswers.length), 0, this.quiz.correctAnswer)
            this.$store.dispatch('randomQuizRoute/autoCompletion').then(res => {
                console.log(this.$store.state.randomQuizRoute.isCompleted)
                //this.isCompleted = this.$store.state.randomQuizRoute.isCompleted;
                //this.marks = this.$store.state.randomQuizRoute.marks;
            })
            
        })
    },
    methods: {
        getSelected(){
            this.$store.dispatch('randomQuizRoute/selectAnswer', this.selectedAnswer);
        },
        nextQuestion(){
            this.$store.dispatch('randomQuizRoute/saveAnswers', {...this.quiz}).then(res => {
                this.quiz = this.$store.state.randomQuizRoute.quiz;
                this.compiledAnswers = this.quiz.incorrectAnswers.splice(Math.floor(Math.random() * this.quiz.incorrectAnswers.length), 0, this.quiz.correctAnswer)
                //console.log(this.$store.state.randomQuizRoute.isCompleted)
                //this.isCompleted = this.$store.state.randomQuizRoute.isCompleted;
                //this.marks = this.$store.state.randomQuizRoute.marks;
            })
        }
    },
    setup() {
        
    },
}
</script>
<style scoped>

</style>