const posts = [
  {
    id: 'hello-world',
    title: 'Hello world',
    paragraphs: [
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at vestibulum elit. Quisque in suscipit dui. Sed a tempor diam. Quisque lobortis faucibus mi viverra lobortis. Sed non lacus eget est aliquet cursus. Suspendisse quis arcu in massa aliquet feugiat. Proin hendrerit, sapien eu faucibus pellentesque, sem quam ornare sapien, vel mattis libero nibh ut nisl. Nullam id tempus arcu. Morbi sit amet magna lorem. Aliquam ullamcorper commodo massa, in cursus nulla euismod sed. Pellentesque semper orci et purus dapibus, nec iaculis massa gravida. Pellentesque ornare mi et magna molestie interdum. Morbi et semper ipsum. In hendrerit nibh vitae urna condimentum interdum. Donec pharetra cursus mi et rutrum. Suspendisse pretium dapibus dolor, ac pharetra ligula luctus vulputate.`,
      `Aenean mauris erat, blandit in ex at, cursus interdum dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In tempor nec quam a malesuada. In a semper turpis. Nunc in augue eu odio fringilla ornare a vel diam. Morbi vel pellentesque quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras odio erat, egestas quis egestas sed, suscipit quis est. Nam in massa non nunc lacinia finibus sed sed leo. Mauris nec dictum erat, id auctor enim. Sed dictum mauris non ligula laoreet malesuada. Cras varius purus ac augue malesuada tempor. Phasellus varius ante ac eros molestie tempus id a arcu. Nullam bibendum risus arcu, non egestas diam consequat vel. Mauris non magna eget nisl consequat aliquam vitae eget purus. Sed sollicitudin id est sit amet pellentesque.`,
      `Nunc dapibus, ipsum sagittis accumsan placerat, enim odio porta ante, in sagittis massa dolor eu lacus. Vestibulum sit amet tristique massa, vitae luctus enim. Curabitur ornare nisi sit amet ex tempor placerat. Fusce in nunc sit amet lorem pulvinar maximus eget at dui. Duis at nulla sit amet ex ultricies porttitor. Morbi sollicitudin nisl vitae nunc pharetra, in pulvinar dui condimentum. Donec metus leo, egestas at mauris vel, cursus pulvinar nibh. Cras nunc sapien, scelerisque ut suscipit vitae, semper in magna. Quisque vehicula est tortor, eget faucibus libero placerat vel. Sed malesuada purus nec lorem tempus vestibulum.`,
      `Duis non nisi ante. Morbi dictum est et augue rutrum varius. Phasellus fermentum finibus luctus. Curabitur ut iaculis augue. Vivamus sem odio, auctor id gravida sed, laoreet et massa. Aenean purus nibh, cursus a sodales ut, sagittis eget urna. Nam in blandit elit. Duis mi lacus, porttitor varius interdum id, posuere id mauris. Curabitur scelerisque elit quis laoreet hendrerit.`,
      `Nunc egestas felis quis mauris imperdiet bibendum. Nullam blandit auctor mauris, consequat pellentesque felis scelerisque vel. In hac habitasse platea dictumst. Etiam hendrerit erat malesuada hendrerit pulvinar. Curabitur id commodo nunc, sit amet molestie ex. Nulla condimentum sapien justo, vel bibendum dolor sodales nec. Curabitur quis metus euismod, gravida nisi id, semper sem. Nunc ullamcorper metus ut massa dapibus, non auctor justo scelerisque. Curabitur condimentum tristique ex, sed commodo elit volutpat ac. Aenean porttitor tincidunt metus. In non consequat libero. In non elit non diam vehicula egestas. Nam finibus sem in auctor pharetra. Praesent vehicula lacus magna, nec mattis urna iaculis ut. Duis vestibulum, ipsum vitae luctus egestas, nisl enim rutrum magna, vel fermentum massa mauris aliquet ipsum. `,
    ],
  },
];

const Blog = () => (
  <>
    {posts.map(({ id, title, paragraphs }) => (
      <article key={id} className="prose">
        <h2 className="heading-2">{title}</h2>
        {paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </article>
    ))}
  </>
);

export default Blog;
